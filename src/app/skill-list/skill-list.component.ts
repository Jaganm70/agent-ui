import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Me } from 'shared-interfaces/user.interface';
import { AppState } from '../reducers/app.states';
import { Store } from '@ngrx/store';
import { WebsocketService } from '../services/websocket.service';

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent implements OnInit {

  skills: any;
  agents: any;
  showSkillDetails: any = false;
  showNewSkillForm: any = false;
  currentSkill: any = {};
  skillName: any = "";
  skillDescription: any = "";

  me : Me;
  constructor(public apiService: ApiService, private store: Store<AppState>, private wsService: WebsocketService) {
      store.select(state => state.me).subscribe(obj =>{
        this.me = obj;
      }); 
    }

  ngOnInit() {
    this.getAllSkills();
  }

  async getAllSkills(){
    this.skills = await Promise.resolve(
      this.apiService
      .get('users/'+this.me._id+'/skills')
      .toPromise()  
    ); 

    // this.skills = [
    //   {
    //     "name": "User problems",
    //     "desc": "resolve user problems",
    //     "agents" :["jaganmohane", "mahesh balla"]
    // }
    // ];

    this.agents = [
      {
        _id: '1',
        name: 'mahesh balla',
        selected: true
      },
      {
        _id: '2',
        name: 'jagan ubitous',
        selected: false
      }
    ]
  }

  onSkillClick(skill){
    this.showSkillDetails = true;
    this.currentSkill = skill;
  };

  toggleSkillForm(inValue){
    this.showNewSkillForm = inValue;
  }

  async addNewSkill(){
    console.log(this.skillName, this.skillDescription);
    let data = {
      name: this.skillName,
      desc: this.skillDescription
    };
    let response = await Promise.resolve(
      this.apiService
      .post('users/'+this.me._id+'/skills', data)
      .toPromise()  
    ); 
    console.log(response);
  }

  goToSkillsPage(){
    this.showSkillDetails = false;
    this.currentSkill = {};
  }

  pluckValues(arr, key){
    var outArr = [];
    (arr || []).forEach(obj => {
      outArr.push(obj[key]);
    });

    return outArr;
  }

  async saveSkillWithAgent(){
    console.log("saved agent details to skill");
    var selectedAgents = this.agents.filter(function(agent){return agent.selected;});
    var data = this.currentSkill;
    data.agents = this.pluckValues(selectedAgents, '_id');
    let response = await Promise.resolve(
      this.apiService
      .post('users/'+this.me._id+'/skills/'+this.currentSkill._id+'/addagent', data.agents)
      .toPromise()  
    ); 
    console.log(response);
  }

  toggleAgentCheck(agent){
    agent.selected = !agent.selected;
  };

}
