import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ApiService } from '../services/api.service';
import { Store } from '@ngrx/store';
import { AppState } from '../reducers/app.states';
import { UPDATE_SERVER_LIST } from '../reducers/server-list.reducer';
import { ErrorService } from '../services/error.service';
import { Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router/src/router_state';
import { SET_ME } from '../reducers/me-reducer';
import { AGENT_CHATS, ACTIVE_CHAT } from '../reducers/chat-request.reducer';

@Injectable()
export class MainResolver implements Resolve<any> {

  constructor(
    private apiService: ApiService,
    private store: Store<AppState>,
    private errorService: ErrorService,
    private router: Router,
  ) {
  }

  async resolve(route: ActivatedRouteSnapshot): Promise<any> {
    try {
      const [{ servers }, { user }]: any =
        await Promise.all([
          this.apiService
            .get('servers')
            .toPromise(),
          this.apiService
            .get('users/me')
            .toPromise()
        ]);
      const agentChats:any = await Promise.resolve(
        this.apiService
        .get('users/me/chats')
        .toPromise()  
      );     
      this.store.dispatch({
        type: UPDATE_SERVER_LIST,
        payload: servers,
      });
      this.store.dispatch({
        type: SET_ME,
        payload: user,
      });

      this.store.dispatch({
        type: AGENT_CHATS,
        payload: agentChats,
      });
      this.store.dispatch({
        type : ACTIVE_CHAT,
        payload: agentChats[0]
      })

    } catch (e) {
      if (e.status === 401) {
        this.router.navigate(['/login']);
      } else {
        this.errorService.errorMessage.next({
          duration: 5000,
          message: 'Unable to retrieve server list.',
          id: new Date().toUTCString(),
        });
      }
    }
  }
}
