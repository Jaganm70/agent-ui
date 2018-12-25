import { Component, OnInit } from '@angular/core';
import { ChatRequest, Visitor } from 'shared-interfaces/visitor.interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { Me } from 'shared-interfaces/user.interface';
import { DELETE_CHAT_REQUEST, ADD_AGENT_CHAT } from '../../reducers/chat-request.reducer';
declare var $: any;

@Component({
  selector: 'app-chat-requests-window',
  templateUrl: './chat-requests-window.component.html',
  styleUrls: ['./chat-requests-window.component.scss']
})
export class ChatRequestsWindowComponent implements OnInit {

  chatRequests: Observable<ChatRequest[]>;
  me : Me;
  count : Number
  constructor(private store: Store<AppState>, private wsService: WebsocketService ) { 
    this.chatRequests = this.store.select((state) => {
      this.count = (state.chatRequests && state.chatRequests.length)? state.chatRequests.length : 0;
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

  openForm() {
    document.getElementById("chat-requests-window-open").style.display = "block";
    document.getElementById("chat-requests-window-close").style.display = "none";
  }
  
   closeForm() {
    document.getElementById("chat-requests-window-open").style.display = "none";
    document.getElementById("chat-requests-window-close").style.display = "block";
  }

  ngOnInit() {
   // $( "#chat-requests-window" ).draggable();
  }

}
