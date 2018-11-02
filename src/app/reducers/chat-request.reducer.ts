import { Visitor, ChatRequest, Message } from 'shared-interfaces/visitor.interface';
import { stat } from 'fs';

export const CHAT_REQUEST = 'CHAT_REQUEST';
export const ACCEPT_CHAT_REQUEST = 'ACCEPT_CHAT_REQUEST';
export const ACCEPTED_CHAT_REQUEST = 'ACCEPTED_CHAT_REQUEST';
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

export function acceptedChatRequestsReducer(
  state: ChatRequest[] = [], action) {
  switch (action.type) {
    case ACCEPTED_CHAT_REQUEST:
      const chatRequest: ChatRequest = action.payload;
      return [...state, chatRequest];
    default:
      return state;
  }
}
const dummyData = {"_id":"1234", "messages":[
  {_id:"1234",
  text:"Hi", 
  type:"incoming", 
  agent:{
    username:"asd",
     _id:"1222"}
    },{_id:"1234",
    text:"Hello", 
    type:"outgoing", 
    agent:{
      username:"asd",
       _id:"1222"}
      },
      {_id:"1234",
    text:"How can i help you?", 
    type:"incoming", 
    agent:{
      username:"asd",
       _id:"1222"}
      }
  ],session_id:"1234", visitor_id:"1234", visitor_name:"jaganmohan" }
export function currentChatRequestReducer(
  state: ChatRequest = dummyData, action) {
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
