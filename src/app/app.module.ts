import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ShContextMenuModule } from 'ng2-right-click-menu';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuiModule } from 'ng2-semantic-ui';
import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { ApiService } from './services/api.service';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { ErrorNotificationComponent } from './components/error-notification/error-notification.component';
import { ErrorService } from './services/error.service';
import { reducers } from './reducers/reducers';
import { HomeComponent } from './components/home/home.component';
import { MainResolver } from './resolvers/main-resolver.service';
import { ImageCropperComponent } from './components/image-cropper/image-cropper.component';
import { AutofocusDirective } from './directives/autofocus.directive';
import { environment } from '../environments/environment';
import { Error404Component } from './components/error-pages/error-404/error-404.component';
import { ClipboardModule } from 'ngx-clipboard';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { ChatListComponent } from './components/chat-list/chat-list.component';
import { ChatWindowComponent } from './components/chat-window/chat-window.component';
import { ChatRequestsComponent } from './components/chat-requests/chat-requests.component';
import { AppHeaderComponent } from './components/app-header/app-header.component';
import { AppBodyComponent } from './components/app-body/app-body.component';
import { RightPanelComponent } from './components/right-panel/right-panel.component';
import { SkillListComponent } from './skill-list/skill-list.component';
import { WebsocketService } from './services/websocket.service';
import { NgxLoadingModule } from 'ngx-loading';


const optionalImports = environment.production ? [] : [
  StoreDevtoolsModule.instrument({
    maxAge: 10,
  }),
];

@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    LoginComponent,
    RegisterComponent,
    ErrorNotificationComponent,
    HomeComponent,
    ImageCropperComponent,
    AutofocusDirective,
    Error404Component,
    LeftSidebarComponent,
    ChatListComponent,
    ChatWindowComponent,
    ChatRequestsComponent,
    AppHeaderComponent,
    AppBodyComponent,
    RightPanelComponent,
    SkillListComponent,
  ],
  entryComponents: [
  ],
  imports: [
    SuiModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(reducers),
    ShContextMenuModule,
    ClipboardModule,
    NgxLoadingModule.forRoot({}),
    ...optionalImports,
  ],
  providers: [
    AuthGuardService,
    ApiService,
    WebsocketService,   
    ErrorService,
    MainResolver
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
