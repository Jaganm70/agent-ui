import { Visitor, ChatRequest, Message, AgentChat } from 'shared-interfaces/visitor.interface';
import { stat } from 'fs';

export const AGENT_CHATS = 'AGENT_CHATS'
export const CHAT_REQUEST = 'CHAT_REQUEST';
export const ACCEPT_CHAT_REQUEST = 'ACCEPT_CHAT_REQUEST';
export const ADD_AGENT_CHAT = 'ADD_AGENT_CHAT';
export const ACTIVE_CHAT_REQUEST = 'ACTIVE_CHAT_REQUEST';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';

export function chatRequestsReducer(
  state: ChatRequest[] = [], action) {
  switch (action.type) {
    case CHAT_REQUEST:
      const chatRequest: ChatRequest = action.payload;
      return [...state, chatRequest];
    case ACCEPT_CHAT_REQUEST:
      const vi: ChatRequest = action.payload;
      var index = state.findIndex(item => item._id === vi._id);
      state.splice(index, 1);
      return state;
    default:
      return state;
  }
}


export function agentChatsReducer(
  state: ChatRequest[] = [], action) {
  switch (action.type) {
    case AGENT_CHATS:
      const agentChats: AgentChat[] = action.payload;
      return agentChats
    case ADD_AGENT_CHAT:
      const agentChat: AgentChat = action.payload;
      return [...state, agentChat];
    default:
      return state;
  }
}
const dummyData = {
  _id:"1234", 
  "messages":[
  {
  _id:"1234",
  message:{
    type: "text",
    text: "Hi"
  }, 
  type:"visitor", 
  agentId:"1222",
  visitorId : "1234",
  sessionId:"1111"
  },
  {
    _id:"1234",
    message:{
      type: "text",
      text: "How are you?"
    }, 
    type:"agent", 
    agentId:"1222",
    visitorId : "1234",
    sessionId:"1111"
    },
    {
      _id:"1234",
      message:{
        type: "text",
        text: "Hi"
      }, 
      type:"visitor", 
      agentId:"1222",
      visitorId : "1234",
      sessionId:"1111"
      }
  ],sessionId:"1234", visitorId:"1234", visitorName:"jaganmohan" }
export function currentChatRequestReducer(
  state: ChatRequest, action) {
  switch (action.type) {
    case ACTIVE_CHAT_REQUEST:
      const chatRequest: ChatRequest = action.payload;
      return chatRequest;
    case ADD_CHAT_MESSAGE:
      const message: Message = action.payload;
      if (!state.messages)
        state.messages = [];
      state.messages.push(message);
      return state;
    default:
      return state;
  }
}
