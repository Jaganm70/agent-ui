import Model from '../models/chat.model'

export class Chat {
    async save(data){
        const chatObj = await new Model(data)
        return await chatObj.save();
    }
    async getChats(agentId){
        //return await Model.find({agentId: agentId});
        return await Model.aggregate([
            {
            $match : {agentId: agentId}
            },
            {
            $lookup :{
                from : 'messages',
                localField : 'sessionId',
                foreignField : 'sessionId',
                as : 'messages'
                }
            },
            { 
            $sort:{
                updatedDate : -1
                }
            }
        ])
    }

    async addAgentToChat(chatId, agentId){
        return await Model.update({_id: chatId}, {agentId: agentId});
    }
}
