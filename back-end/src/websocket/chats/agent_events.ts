import { redisLib } from '../../RedisLib'
import { Message } from '../../db/message'
import { random } from '../../utils/random';
import { Chat } from '../../db/chat'
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
            var session = await redis.hget("chat_visitors", visitorId);
            session.agentId = agentId;
            await redis.hset("chat_visitors", visitorId, session);
        });

        socket.on('send-message',async(data: any) => {
            const visitorId = data.visitorId;
            const visitor = await redis.hget("chat_visitors", visitorId);
            const messageId = await random();
            data._id = messageId;
            data.sessionId = visitor.sessionId;
            await new Message().save(data)
        });
        
    });
  }