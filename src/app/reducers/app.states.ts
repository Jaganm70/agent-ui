import ChatServer from 'shared-interfaces/server.interface';
import { ChatChannel } from 'shared-interfaces/channel.interface';
import { Me } from 'shared-interfaces/user.interface';
import { VoiceChannel } from '../../../shared-interfaces/voice-channel.interface';
import { Visitor, ChatRequest, AgentChat } from '../../../shared-interfaces/visitor.interface';
export interface AppState {
  me: Me;
  chatRequests : ChatRequest[];
  currentChat  : ChatRequest;
  agentChats : AgentChat[];
}
