import { Component, OnInit } from '@angular/core';
import { AgentChat } from 'shared-interfaces/visitor.interface';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.scss']
})
export class ChatListComponent implements OnInit {
  agentChats: Observable<AgentChat[]>;
  constructor(private store: Store<AppState>, private wsService: WebsocketService) {
    this.agentChats = this.store.select((state) => {
      state.agentChats[0]['active'] = true;
      return state.agentChats  
    });
   }

  ngOnInit() {
  }

}
