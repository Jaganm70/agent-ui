import { createClient } from '../../RedisClient';
export async function agentEvents(io: any) {
    const client = await createClient({});
    io.on('connection', socket => {
        socket.on('chat-request-accepted',async(data: any) => {
            var visitor_id = data.visitor.visitor_id;
            var sessionStr = client.hget("sessions", visitor_id, function(err, item){
                const session: any = JSON.parse(item);
                console.log(">>>>>", session);
                session.socket_id = socket.id;
                client.hset("sessions", visitor_id, JSON.stringify(session));
             }); 
        });

        socket.on('send-message',async(data: any) => {
            var session_id = data.session_id;
            var visitor_id = data.visitor_id;
            let messages = client.hget("messages", visitor_id, function(err, messages){
                if(messages){
                    messages = JSON.parse(messages);  
                } else {
                    messages = []
                }
                messages.push(data);
                client.hset("messages", session_id, JSON.stringify(messages));
            });
            
        });
        
    });
  }