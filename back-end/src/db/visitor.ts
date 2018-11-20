
import Model from '../models/visitor.model'

export class Visitor {
    async findOrCreateVisitor(data){
        const visitor = await Model.findOne({_id: data._id});
        if(visitor){
           return visitor 
        } 
        
        const visitorObj = await new Model(data)
        const result  = await visitorObj.save();
        return await Model.findOne({_id: data._id});
    }
}
