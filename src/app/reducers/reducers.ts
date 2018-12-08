import { ActionReducerMap } from '@ngrx/store';
import { AppState } from './app.states';
import { meReducer } from './me-reducer';
import { currentChatRequestReducer, agentChatsReducer, chatRequestsReducer } from './chat-request.reducer';


export const reducers: ActionReducerMap<AppState> = {
  me: meReducer,
  chatRequests: chatRequestsReducer,
  agentChats : agentChatsReducer,
  currentChat  : currentChatRequestReducer
};
