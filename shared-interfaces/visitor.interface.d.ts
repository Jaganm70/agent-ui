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
  text : String,
  type : String,
  agent : Me
}

export interface ChatRequest {
  _id : String,
  visitor_id : String,
  session_id: String,
  visitor_name : String,
  messages : Message[]
}