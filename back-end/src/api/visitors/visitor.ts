import { randomstring } from 'randomstring';
import {getIoServer} from '../../websocket/socket-server';
import { createClient } from '../../RedisClient';
import { redisLib } from '../../RedisLib'
import { Visitor } from './../../db/visitor';
import { Message } from '../../db/message'
import { random } from '../../utils/random'
import { Chat } from '../../db/chat';


export async function startChat(req, res) {
    const visitorId = req.params.visitorId;
    const body = req.body;
    var io = getIoServer();
    const sessionId = await random();
    const visitorObj = Object.assign({_id: visitorId}, body)
    const visitor = await new Visitor().findOrCreateVisitor(visitorObj);
    const chatId = await random();
    const chatObj = {
        _id : chatId,
        visitorId : visitor._id,
        sessionId : sessionId
    }
    const chat = await new Chat().save(chatObj);
    io.emit('visitor-chat-request', chatObj); 
    const redis = await redisLib();
    const status = await redis.hset("chat_visitors", visitorId , {"sessionId":sessionId})
    var resObj = {
        session_id : sessionId,
        visitorId : visitor._id
    }    
    res.status(200);
    res.send(resObj);
  }

export async function sendMessage(req, res) {
    var visitorId = req.params.visitorId;    
    var body = req.body;
    var sessionId = body.sessionId;
    var io = getIoServer();
    const redis = await redisLib();
    const visitor = await redis.hget("chat_visitors", visitorId);
    if(visitor && visitor.sessionId == sessionId && visitor.agentId){
        const messageId = await random(); 
        var data = {
            _id : messageId, 
            message:{
                type: 'text',
                text: body.message
            }, 
            visitorId : visitorId,
            agentId : visitor.agentId,
            type : 'visitor', 
            sessionId: sessionId 
        }   
         var socketId = await redis.hget("chat_agents", visitor.agentId);
         io.to(socketId).emit('chat-message', data);
         await new Message().save(data)
         res.status(200);
         res.send({"status":"success"});
        } else if(visitor && !visitor.agentId){
            res.status(404);
            res.send({"status":"Agent not accepted your request."});
        }else {
            res.status(404);
            res.send({"message":"Session not exist Or Session expired"});
       }
    }

export async function getMessages(req, res) {
    const body = req.body;
    const visitorId = req.params.visitorId;
    const sessionId = body.sessionId;
    const io = getIoServer();
    const client = await redisLib();
    const visitor = await client.hget("chat_visitors",visitorId);
    if(visitor.sessionId == sessionId){
     const messages = await new Message().getMessagesBySession(sessionId)
     res.status(200);
     res.send(messages);
    } else {
        res.status(404);
        res.send({"message":"Session not exist Or Session expired"});
   }
}
  