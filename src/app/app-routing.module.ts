import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth-guard.service';
import { LoginComponent } from './login/login.component';
import { TrainerComponent } from './trainer/trainer.component';


const routes: Routes = [
 /*  { path: 'trainers', component: TrainerComponent, data: { title: 'trainers'} ,canActivate: [AuthGuard] },
  {
    path: '',
    redirectTo: '',
    pathMatch: 'full',
    canActivate: [AuthGuard] 
  },
 
  { path: 'login', component: LoginComponent, data: { title: 'login'},canActivate: [AuthGuard] },
  
  {
    path: '**',
    redirectTo: '',
    canActivate: [AuthGuard] 
  } */
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
