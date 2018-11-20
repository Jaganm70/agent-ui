import { agent } from "supertest";
import { Me } from "shared-interfaces/user.interface";

export interface Visitor {
  _id?: string;
  username: string;
  avatar?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Message {
  _id : String,
  message : any,
  type : String,
  agentId : String,
  visitorId : String,
  sessionId : String
}

export interface AgentChat {
  _id : String,
  visitorId : String,
  sessionId: String,
  visitorName : String,
  messages : Message[]
}
export interface ChatRequest {
  _id : String,
  visitorId : String,
  sessionId: String,
  visitorName : String,
  messages : Message[]
}