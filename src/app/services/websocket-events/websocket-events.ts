import 'rxjs/add/operator/take';
import {  CHAT_REQUEST, ADD_CHAT_MESSAGE, ADD_AGENT_CHAT, ACTIVE_CHAT, DELETE_CHAT_REQUEST} from '../../reducers/chat-request.reducer';
import { WebsocketService } from '../websocket.service';


export const CHANNEL_LIST_HANDLER = 'channel-list';
export const JOINED_CHANNEL_HANDLER = 'joined-channel';
export const SERVER_USERLIST_HANDLER = 'server-user-list';
export const SERVER_UPDATE_USERLIST_HANDLER = 'update-user-list';
export const SET_FRIEND_REQUESTS_HANDLER = 'friend-requests';
export const JOINED_VOICE_CHANNEL_HANDLER = 'joined-voice-channel';
export const VOICE_CHANNEL_USERS = 'voice-channel-users';

export const VISITOR_CHAT_REQUEST_HANDLER = 'visitor-chat-request';
export const DELETE_CHAT_REQUEST_HANDLER = 'delete-chat-request';
export const CHAT_MESSAGE_HANDLER = 'chat-message';
export const NEW_CHAT_HANDLER = 'new-chat';

export const handlers: { [key: string]: (wsService: WebsocketService) => void } = {
  [CHAT_MESSAGE_HANDLER]: chatMessage,
  [VISITOR_CHAT_REQUEST_HANDLER]: visitorchatrequest,
  [NEW_CHAT_HANDLER] : newChat,
  [DELETE_CHAT_REQUEST_HANDLER]: deleteChatRequest
};

function visitorchatrequest(wsService: WebsocketService){
  wsService.socket.on(VISITOR_CHAT_REQUEST_HANDLER, (visitor) => {
    wsService.store.dispatch({
      type: CHAT_REQUEST,
      payload: visitor,
    });
  });
}

function chatMessage(wsService: WebsocketService){
  wsService.socket.on(CHAT_MESSAGE_HANDLER, (message) => {
    wsService.store.dispatch({
      type: ADD_CHAT_MESSAGE,
      payload: message,
    });
  });
}

function newChat(wsService: WebsocketService){
  wsService.socket.on(NEW_CHAT_HANDLER, (chat) => {
    wsService.store.dispatch({
      type: ACTIVE_CHAT,
      payload: chat,
    });
    wsService.store.dispatch({
      type: ADD_AGENT_CHAT,
      payload: chat,
    });
    
  });
}

function deleteChatRequest(wsService: WebsocketService){
  wsService.socket.on(DELETE_CHAT_REQUEST_HANDLER, (chat) => {
    wsService.store.dispatch({
      type: DELETE_CHAT_REQUEST,
      payload: chat,
    });
  });
}
