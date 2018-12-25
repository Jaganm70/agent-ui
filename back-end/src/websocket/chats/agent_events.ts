import { redisLib } from '../../RedisLib'
import { Message } from '../../db/message'
import { random } from '../../utils/random';
import { Chat } from '../../db/chat'
import sendMessage  from '../../utils/requestutil'

export async function agentEvents(io: any) {
    const redis = await redisLib();
    io.on('connection', socket => {
        const agentId = socket.claim.user_id;
        const socketId = socket.id;
        redis.hset("chat_agents", agentId, socketId);
        socket.on('chat-request-accepted',async(data: any) => {
            var visitorId = data.visitorId;
            var agentId = data.agentId;
            var chatId = data._id;
            await new Chat().addAgentToChat(chatId, agentId);
            const new_chat:any = await new Chat().getChatById(chatId);
            console.log("New Chat...", new_chat);
            io.emit("delete-chat-request", new_chat);
            socket.emit("new-chat", new_chat);
            var session = await redis.hget("chat_visitors", visitorId);
            session.agentId = agentId;
            await redis.hset("chat_visitors", visitorId, session);
            const agent = socket.claim;
            const event = {
                "message": {
                    type : 'text',
                    text : 'Agent accepted your chat'
                  },
                "event": "accepted",
                "visitor": {
                    "id": data.visitorId,
                    "name": ""
                },
                "agent": {
                    "id": agent.user_id,
                    "name": agent.username
                },
                "sessionId": new_chat.sessionId,
                "createdDate": data.createdDate
             }
             sendMessage(event)
        });

        socket.on('send-message',async(data: any) => {
            const visitorId = data.visitorId;
            const visitor = await redis.hget("chat_visitors", visitorId);
            const messageId = await random();
            const agent = socket.claim;

            if(visitor){
                data._id = messageId;
                data.sessionId = visitor.sessionId;
                await new Message().save(data);
                const event = {
                    "message": data.message,
                    "event": "message",
                    "visitor": {
                        "id": data.visitorId,
                        "name": ""
                    },
                    "agent": {
                        "id": agent.user_id,
                        "name": agent.username
                    },
                    "sessionId": data.sessionId,
                    "createdDate": data.createdDate,
                    "_id": data._id
                }
                sendMessage(event);
                
            } else {
                const _data =  {
                    _id: messageId,
                    message : {
                      type : 'text',
                      text : 'Chat session ended.'
                    },
                    type : 'system',
                    visitorId: visitorId,
                    sessionId: data.sessionId,
                    agentId : data.agentId
                };
                socket.emit('send-message', _data);
                const event = {
                    "message": data.message,
                    "event": "closed",
                    "visitor": {
                        "id": data.visitorId,
                        "name": ""
                    },
                    "agent": {
                        "id": agent.user_id,
                        "name": agent.username
                    },
                    "sessionId": data.sessionId,
                    "createdDate": data.createdDate,
                    "_id": messageId
                }
                sendMessage(event)  
            }
        });

        socket.on('end-chat',async(data: any) => {
            const visitorId = data.visitorId;
            const visitor = await redis.hget("chat_visitors", visitorId);
            await redis.hdel("chat_visitors", visitorId);
            const agent = socket.claim; 
            const messageId = await random();
            const msg =  {
                _id : messageId,
                message : {
                  type : 'text',
                  text : 'Chat session ended.'
                },
                type : 'system',
                visitorId: visitorId,
                sessionId: data.sessionId,
                agentId : data.agentId
              };
              await new Message().save(msg); 
              await new Chat().updateChatStatus(data._id, 'inactive')
              socket.emit('send-message', msg);
              data.status = 'inactive';
              socket.emit('chat-ended', data);
              const event = {
                "message": msg.message,
                "event": "closed",
                "visitor": {
                    "id": data.visitorId,
                    "name": ""
                },
                "agent": {
                    "id": agent.user_id,
                    "name": agent.username
                },
                "sessionId": data.sessionId,
                "createdDate": data.createdDate,
                "_id": messageId
             }
            sendMessage(event)  
        });
        
    });
  }