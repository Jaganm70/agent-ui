import { Component, OnInit } from '@angular/core';
import { ChatRequest, Visitor } from 'shared-interfaces/visitor.interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { Me } from 'shared-interfaces/user.interface';
import { ACCEPT_CHAT_REQUEST, ACTIVE_CHAT_REQUEST } from '../../reducers/chat-request.reducer';

@Component({
  selector: 'app-chat-requests',
  templateUrl: './chat-requests.component.html',
  styleUrls: ['./chat-requests.component.scss']
})
export class ChatRequestsComponent implements OnInit {

  chatRequests: Observable<ChatRequest[]>;
  me : Me
  constructor(private store: Store<AppState>, private wsService: WebsocketService ) { 
    this.chatRequests = this.store.select((state) => {
      console.log("======");
    return state.chatRequests;
    });
     store.select(state => state.me).subscribe(rep =>{
      this.me = rep;
    });
  }

  acceptRequest(request){
    event.preventDefault();

    var data = {
      visitor : request,
      agent : this.me
    }
    this.store.dispatch({
      type: ACCEPT_CHAT_REQUEST,
      payload: request,
    });

    this.store.dispatch({
      type: ACTIVE_CHAT_REQUEST,
      payload: request,
    });
    this.store.dispatch({
      type: ACCEPT_CHAT_REQUEST,
      payload: request,
    });
    this.wsService.socket.emit('chat-request-accepted', data);

  }
  ngOnInit() {
  }

}
