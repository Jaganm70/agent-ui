import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../reducers/app.states';
import ChatServer from 'shared-interfaces/server.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  
  constructor(
    store: Store<AppState>,
  ) {
    
  }

  ngOnInit() {
  }

}
