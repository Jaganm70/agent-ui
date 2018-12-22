import { Visitor, ChatRequest, Message, AgentChat } from 'shared-interfaces/visitor.interface';
import { stat } from 'fs';

export const AGENT_CHATS = 'AGENT_CHATS'
export const CHAT_REQUEST = 'CHAT_REQUEST';
export const DELETE_CHAT_REQUEST = 'DELETE_CHAT_REQUEST';
export const ADD_AGENT_CHAT = 'ADD_AGENT_CHAT';
export const ACTIVE_CHAT = 'ACTIVE_CHAT';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';
export const CHAT_ENDED = 'CHAT_ENDED';

export function chatRequestsReducer(
  state: ChatRequest[] = [], action) {
  switch (action.type) {
    case CHAT_REQUEST:
      const chatRequest: ChatRequest = action.payload;
      return [...state, chatRequest];
    case DELETE_CHAT_REQUEST:
      const vi: ChatRequest = action.payload;
      var index = state.findIndex(item => item._id === vi._id);
      state.splice(index, 1);
      return state;
    default:
      return state;
  }
}


export function agentChatsReducer(
  state: AgentChat[] = [], action) {
  switch (action.type) {
    case AGENT_CHATS:
      const agentChats: AgentChat[] = action.payload;
      return agentChats
    case ADD_AGENT_CHAT:
      const agentChat: AgentChat = action.payload;
      return [agentChat, ...state];
    default:
      return state;
  }
}

export function currentChatRequestReducer(
  state: ChatRequest, action) {
  switch (action.type) {
    case ACTIVE_CHAT:
      const chatRequest: ChatRequest = action.payload;
      return chatRequest;
    case ADD_CHAT_MESSAGE:
      const message: Message = action.payload;
      if (!state.messages)
        state.messages = [];
      state.messages.push(message);
      return state;
    case CHAT_ENDED:
    const chat: ChatRequest = action.payload;
    return chat;
    default:
      return state;
  }
}
