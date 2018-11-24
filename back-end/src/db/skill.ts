
import Model from '../models/skill.model'

export class Skill {
    async getSkills(){
        return await Model.find({});
    }
    async getSkillById(id){
        return await Model.findOne({_id: id});
    }
    async create(data){
        const skilObj = await new Model(data)
        return await skilObj.save();
    }

    async addAgentsToSkill(skillId, agents){
        let skill:any = await Model.findOne({_id:skillId});
        agents = await [...agents, ...skill.agents];
        return await Model.update({_id: skillId},{agents: agents})
    }

    async removeAgentsFromSkill(skillId, agents){
        let skill:any = await Model.findOne({_id:skillId});
        const finalAgents = await skill.agents.filter(agent => {return agents.indexOf(agent.toString()) === -1});
        return await Model.update({_id: skillId},{agents: finalAgents})
    }
}
