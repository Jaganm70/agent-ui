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
    this.agentChats = this.store.select((state) => {
      console.log("AAAAAAAA",state.currentChat._id);
      this.activeVisitorId = state.currentChat._id;
      return state.agentChats;  
    });
   }

  ngOnInit() {
  }

  selectVisitor(visitorObject){
    this.store.dispatch({
      type : ACTIVE_CHAT,
      payload: visitorObject
    });
    this.activeVisitorId = visitorObject.visitorId;
  }

}
