import { Component, OnInit } from '@angular/core';
import { ChatRequest, Visitor } from 'shared-interfaces/visitor.interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { Me } from 'shared-interfaces/user.interface';
import { DELETE_CHAT_REQUEST, ADD_AGENT_CHAT } from '../../reducers/chat-request.reducer';

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
      return state.chatRequests;
    });
     store.select(state => state.me).subscribe(rep =>{
      this.me = rep;
    });
  }

  acceptRequest(request){
    event.preventDefault();
    var data = {
      visitorId : request.visitorId,
      agentId : this.me._id,
      _id : request._id
    }
    this.store.dispatch({
      type: DELETE_CHAT_REQUEST,
      payload: request,
    });

    // this.store.dispatch({
    //   type: ADD_AGENT_CHAT,
    //   payload: request
    // });

    // this.store.dispatch({
    //   type: ACTIVE_CHAT_REQUEST,
    //   payload: request,
    // });
    
    this.wsService.socket.emit('chat-request-accepted', data);

  }
  ngOnInit() {
  }

}
