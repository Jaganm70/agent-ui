import { Message } from '../db/message'
export async function getChatMessages(userId, visitorId){
  return await new Message().getMessages(userId, visitorId);
}