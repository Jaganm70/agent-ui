import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MainComponent } from './components/main/main.component';
import { LoginComponent } from './components/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { MainResolver } from './resolvers/main-resolver.service';
import { Error404Component } from './components/error-pages/error-404/error-404.component';
import { SkillListComponent } from './skill-list/skill-list.component';

export const appRoutes: Routes = [
  {
    path: 'login', 
    component: LoginComponent,
    children: [
      { path: ':redirect', component: LoginComponent },
    ],
  },
  {
    path: 'register', component: RegisterComponent,
  },
  {
    path: 'error',
    children: [
      {
        path: '404', component: Error404Component,
      },
    ],
  },
  {
    // Logged in routes
    path: '', component: MainComponent,
    // pathMatch: 'full',
    canActivate: [AuthGuardService],
    resolve: { state: MainResolver },
    children: [
      {
        path: '', component: HomeComponent,
      },
      {
        path: 'skills', component: SkillListComponent
      }
    ],
  },
  {
    path: '**',
    component: Error404Component,
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, { enableTracing: false }),
  ],
  exports: [
    RouterModule,
  ],
})
export class AppRoutingModule { }
