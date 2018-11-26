import { random } from '../utils/random'
import { Skill } from '../db/skill'
import Model from '../models/skill.model';

export async function getSkills(req, res){
    const userId = req.params.userId;
    const skills = await new Skill().getSkills();
    res.status(200)
    res.send(skills); 
}
export async function createSkill(req, res){
    const userId = req.params.userId;
    let data =  req.body;
    data._id = await random();
    data.createdBy = userId;
    data.updatedBy = userId;
    const resData = await new Skill().create(data);
    res.status(200)
    res.send(resData);
}

export async function addAgentsToSkill(req, res){
    const userId = req.params.userId;
    const skillId = req.params.skillId;
    const data =  req.body;
     
    if(Array.isArray(data)){
        const resData = await new Skill().addAgentsToSkill(skillId, data);
        res.status(200)
        res.send(resData);
    } else {
        res.status(400)
        res.send({"err":"Invalid Data"});
    }
}

export async function removeAgentsFromSkill(req, res){
    const userId = req.params.userId;
    const skillId = req.params.skillId;
    const data =  req.body;
    if(Array.isArray(data)){
        const resData = await new Skill().removeAgentsFromSkill(skillId, data);
        res.status(200)
        res.send(resData);
    } else {
        res.status(400)
        res.send({"err":"Invalid Data"});
    }
}