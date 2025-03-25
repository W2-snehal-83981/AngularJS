import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';
import { EditUserComponent } from './components/user/edit-user/edit-user.component';
import { ViewUsersComponent } from './components/user/view-users/view-users.component';
import { LoginComponent } from './components/login/login.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UserDashboardComponent } from './components/user/user-dashboard/user-dashboard.component';
import { RoleGuardService } from './services/role-guard.service';

export const routes: Routes = [
    {path:'login', component:LoginComponent},
    { path: 'dashboard', component: DashboardComponent, canActivate:[RoleGuardService], data:{expectedRole:'admin'}, children: [
      { path: 'add-user', component: AddUserComponent },
      { path: 'edit-user/:id', component: EditUserComponent },
      { path: 'view-users', component:ViewUsersComponent } 
    ]},
    { path: '', redirectTo: '/login', pathMatch: 'full' },
    {path:'user-dashboard',component:UserDashboardComponent, canActivate:[RoleGuardService], data:{expectedRole:'user'}}
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule,BrowserModule],
  })
  export class AppRoutingModule {}