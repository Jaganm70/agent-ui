import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import { WebsocketService } from '../../services/websocket.service';
import { Me } from 'shared-interfaces/user.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {
  me : Me
  constructor(private store: Store<AppState>, private router : Router, private wsService: WebsocketService) {
    this.store.select(state=> state.me).subscribe(obj =>{
      if(obj && !obj.status) obj.status = "offline"
      this.me = obj;
    }); 
   }
  signout(){
    this.wsService.connected = false;
    this.router.navigate(['/login']);
  }
  changeStatus(status){
    if(status =='online'){
      this.connectToSocket(status);
    } else{
       this.disconnect(status);
    }
  }
  async disconnect(state){
     await this.wsService.disconnect();
     this.me.status = state;
  }
  async connectToSocket(status) {
    const connected = await this.wsService.connect().toPromise();
    if (connected) {
      this.me.status = status;
    } else {
      this.me.status = "offline";
    }
    return !connected && {
      error: {
        error: 'Unable to establish a connection.',
      },
    };
  }
  ngOnInit() {
  }


}
