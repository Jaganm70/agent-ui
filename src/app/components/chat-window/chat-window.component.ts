import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { ChatRequest, Message, AgentChat } from 'shared-interfaces/visitor.interface';
import { Me } from 'shared-interfaces/user.interface';
import { ADD_CHAT_MESSAGE } from '../../reducers/chat-request.reducer';


@Component({
  selector: 'app-chat-window',
  templateUrl: './chat-window.component.html',
  styleUrls: ['./chat-window.component.scss']
})
export class ChatWindowComponent implements OnInit {

  chatMessage: string;
  @ViewChild('chatInput') private chatInput: ElementRef;
  @ViewChild('messgeContainer') private messageContainer: ElementRef;
  
  messages: Observable<Message[]>;
  activeChat : ChatRequest;
  me : Me;
  loading:false;
  ws;
  constructor(private store: Store<AppState>, private wsService: WebsocketService) {
    this.ws = this.wsService;
    this.messages = this.store.select((state) => {
      return (state.currentChat && state.currentChat.messages)? state.currentChat.messages :[];
    });
    
    store.select(state => state.currentChat).subscribe(obj =>{
        this.activeChat = obj;
      });
      store.select(state => state.me).subscribe(obj =>{
        this.me = obj;
      }); 
      
    }
  
  ngOnInit() {
  }

  sendMessage(msg: string) {
    if (msg.length < 1) {
      return;
    }
    const message =  {
      message : {
        type : 'text',
        text : msg
      },
      type : 'agent',
      visitorId: this.activeChat.visitorId,
      sessionId: this.activeChat.sessionId,
      agentId : this.me._id,
      createdDate: new Date().toISOString()
    };
    this.store.dispatch({
      type: ADD_CHAT_MESSAGE,
      payload: message,
    });

    this.wsService.socket.emit('send-message', message);
    this.chatMessage = "";
    //this.scrollChatToBottom();
  }
  endChat(chat: any){
    //delete chat.messages;
    this.wsService.socket.emit('end-chat', chat);
  }
  scrollChatToBottom() {
    //this.messageContainer.nativeElement.scrollTop = this.messageContainer.nativeElement.scrollHeight;
  }
}
