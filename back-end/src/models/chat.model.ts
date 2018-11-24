import * as mongoose from 'mongoose';
const ChatSchema = new mongoose.Schema({
    _id : {type: String, required: true},
    visitorId : {type: String, required: true},
    sessionId : {type: String, required: true},
    agentId : String,
    status : {type: String, enum:['active', 'inactive']},
    createdDate : {type: Date, required: true, default: Date.now},
    updatedDate : {type: Date, required: true, default: Date.now}
  });
  
  const Chat  = mongoose.model('chat', ChatSchema);

export default Chat;
