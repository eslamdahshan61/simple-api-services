import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TrainerComponent } from './trainer/trainer.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from "@angular/common/http";
import { ToastrModule } from 'ngx-toastr';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from "@angular/forms";
import { CookieService } from 'ngx-cookie-service';
import { AuthGuard } from './auth-guard.service';
import {NgxPaginationModule} from 'ngx-pagination';
import { RouterModule } from '@angular/router';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

@NgModule({
  declarations: [
    AppComponent,
    TrainerComponent,
    LoginComponent
  ],
  imports: [
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'trainers', component: TrainerComponent ,canActivate: [AuthGuard] },
      
      { path: "", redirectTo: "trainers", pathMatch: "full" },
      { path: "**", redirectTo: "trainers", pathMatch: "full"}
      
    ]), 
    NgxPaginationModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() // ToastrModule added
    ,ReactiveFormsModule,FormsModule,
    HttpClientModule,
    SweetAlert2Module.forRoot()

  ],
  providers: [
    CookieService,
    AuthGuard
   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
