import { Component, OnInit } from '@angular/core';
import { AgentChat } from 'shared-interfaces/visitor.interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';

export const AGENT_CHATS = 'AGENT_CHATS'
export const CHAT_REQUEST = 'CHAT_REQUEST';
export const ACCEPT_CHAT_REQUEST = 'ACCEPT_CHAT_REQUEST';
export const ADD_AGENT_CHAT = 'ADD_AGENT_CHAT';
export const ACTIVE_CHAT_REQUEST = 'ACTIVE_CHAT_REQUEST';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  agentChats: Observable<AgentChat[]>;
  activeVisitorId: any;
  constructor(private store: Store<AppState>, private wsService: WebsocketService) {
    this.agentChats = this.store.select((state) => {
      // state.agentChats[0]['active'] = true;
      this.activeVisitorId = state.currentChat.visitorId;
      return state.agentChats;  
    });
   }

  ngOnInit() {
  }

  selectVisitor(visitorObject){
    
    this.store.dispatch({
      type : ACTIVE_CHAT_REQUEST,
      payload: visitorObject
    });
    // this.activeVisitorId = visitorObject.visitorId;
  }

}
