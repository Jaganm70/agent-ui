import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { Me } from 'shared-interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  me : Observable<Me>
  constructor(private store: Store<AppState>, private router : Router, private wsService: WebsocketService) {
    this.me = this.store.select((state) => {
      return state.me;
    });
   }
  signout(){
    this.wsService.connected = false;
    this.router.navigate(['/login']);
  }
  ngOnInit() {
  }

}
