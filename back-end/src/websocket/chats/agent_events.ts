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
            const new_chat = await new Chat().getChatById(chatId);
            console.log("New Chat...", new_chat);
            io.emit("delete-chat-request", new_chat);
            socket.emit("new-chat", new_chat);
            var session = await redis.hget("chat_visitors", visitorId);
            session.agentId = agentId;
            await redis.hset("chat_visitors", visitorId, session);
        });

        socket.on('send-message',async(data: any) => {
            const visitorId = data.visitorId;
            const visitor = await redis.hget("chat_visitors", visitorId);
            const messageId = await random();
                
            if(visitor){
                data._id = messageId;
                data.sessionId = visitor.sessionId;
                await new Message().save(data)
                sendMessage(data)
                
            } else {
                const message =  {
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
                socket.emit('send-message', message)  
            }
        });

        socket.on('end-chat',async(data: any) => {
            console.log("AAAAAAAAA");
            const visitorId = data.visitorId;
            const visitor = await redis.hget("chat_visitors", visitorId);
            await redis.hdel("chat_visitors", visitorId);
            const messageId = await random();
            const message =  {
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
              await new Message().save(message); 
              await new Chat().updateChatStatus(data._id, 'inactive')
              socket.emit('send-message', message);
              data.status = 'inactive';
              socket.emit('chat-ended', data);  
        });
        
    });
  }