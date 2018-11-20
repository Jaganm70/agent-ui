import * as mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    _id : { type: String, required: true},
    visitorId : {type: String, required: true},
    agentId: {type: String, required: true},
    type: {type: String, enum:['visitor', 'agent'], required: true},
    sessionId : String,
    message : Object,
    createdDate : {type: Date, required: true, default: Date.now},
    updatedDate : {type: Date, required: true, default: Date.now}
  });
  
  const Message  = mongoose.model('message', MessageSchema);

export default Message;
