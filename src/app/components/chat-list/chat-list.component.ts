import { Component, OnInit } from '@angular/core';
import { AgentChat } from 'shared-interfaces/visitor.interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { ACTIVE_CHAT } from '../../reducers/chat-request.reducer';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  agentChats: Observable<AgentChat[]>;
  activeVisitorId: any;
  constructor(private store: Store<AppState>, private wsService: WebsocketService) {
    //this.store.subscribe(state => this.agentChats = state.agentChats);
    this.agentChats = this.store.select((state) => {
      this.activeVisitorId = state.currentChat ? state.currentChat._id: null;
      return state.agentChats;  
    });
   }

  ngOnInit() {
    //this.store.subscribe(state => console.log(state));
  }

  selectVisitor(visitorObject){
    this.store.dispatch({
      type : ACTIVE_CHAT,
      payload: visitorObject
    });
    // this.activeVisitorId = visitorObject.visitorId;
  }

  getLastMessage(arr){
    let msg;
    arr = arr? arr: [];
    arr.forEach(el => {
       if(el.type==='agent'){
         msg = el.message.text;
         return;
       }  
     });
     return msg? msg :'Nothing'
  }

}
