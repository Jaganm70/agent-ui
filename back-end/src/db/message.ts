import Model from '../models/message.model'

export class Message {
    async save(data){
        const messageObj = await new Model(data)
        return await messageObj.save();
    }

    async getMessagesBySession(sessionId){
        return await Model.find({sessionId : sessionId});
    }
    async getMessages(agentId, visitorId){
        return await Model.find({agentId : agentId, visitorId: visitorId});
    }

}
