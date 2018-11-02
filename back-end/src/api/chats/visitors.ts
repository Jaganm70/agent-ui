import { randomstring } from 'randomstring';
import {getIoServer} from '../../websocket/socket-server';
import { createClient } from '../../RedisClient';
import { redisLib } from '../../RedisLib'

function genarateUUID() {
    function s4() {
      return Math.floor((1 + Math.random()) * 0x10000)
        .toString(16)
        .substring(1);
    }
    return s4() + s4() + '-' + s4() + '-' + s4() + '-' + s4() + '-' + s4() + s4() + s4();
  }

export async function startChat(req, res) {
    const visitorId = req.params.visitorId;
    var io = getIoServer();
    const session_id = await genarateUUID();
    io.emit('visitor-chat-request', {"username":"Jaganmohan", visitor_id : visitorId, session_id: session_id});
    //const client = await createClient({});
    //client.hset('sessions',visitorId, JSON.stringify({"session_id":session_id}))
    const client = await redisLib();
    const status = await client.save("sessions", visitorId, {"session_id":session_id})
    var sessionData = {
        session_id : session_id,
        visitorId : visitorId
    }    
    res.status(200);
    res.send(sessionData);
  }

export async function sendMessage(req, res) {
        var body = req.body;
        var visitorId = req.params.visitorId;
        var session_id = body.session_id;
        var io = getIoServer();
        const client = await redisLib();
        const session = await client.get("sessions",visitorId);
        if(session && session.session_id == session_id && session.socket_id){
         var data = { 
            text:body.message, 
            visitor_id: visitorId,
            type : 'outgoing', 
            session_id: body.session_id}   
         io.to(session.socket_id).emit('chat-message', data);
         res.status(200);
         res.send({"status":"success"});
        } else if(session && !session.socket_id){
            res.status(404);
            res.send({"status":"Agent not accepted your request."});
        }else {
            res.status(404);
            res.send({"message":"Session not exist Or Session expired"});
       }
    }

export async function getMessages(req, res) {
    var body = req.body;
    var visitorId = req.params.visitorId;
    var io = getIoServer();
    const client = await redisLib();
    const session = await client.get("sessions",visitorId);
    if(session.session_id == body.session_id){
     const messages = await client.get("messages", visitorId);
     console.log("Messss", messages);
     res.status(200);
     res.send(messages);
    } else {
        res.status(404);
        res.send({"message":"Session not exist Or Session expired"});
   }
}
  