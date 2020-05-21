import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  constructor(private cookieService: CookieService  ,public toastr: ToastrService,private ApiService:ApiService,private router:Router ,  ) { 


    

  }

  Userform = new FormGroup({
    email: new FormControl('', Validators.required),
    passwords: new FormControl('', Validators.required),
   
    })
  
  ngOnInit() {

    

  }

  onSubmit(formValue){
  
    
    if (this.Userform.valid) {

      
      this.ApiService.login(formValue).subscribe(
        res => {
            let error:number= res["error"];

            if(error==0){

              let result: any[] = res["data"];
              let first_name: any = result["first_name"];
              let user_token: any = result["user_token"];

              

              this.cookieService.set( 'first_name', first_name );
              this.cookieService.set( 'user_token', user_token );

              
              this.toastr.success(' Welcome '+ first_name ,' ');
      

              this.router.navigate(['/trainers']).then(() => {
                window.location.reload();
                });

      
            }else{
              this.toastr.error(' ', 'المعلومات خطا ');
            }
      
          });


    
    
 
     }else{
      this.toastr.warning('Please fill out all fields correctly', '');

     }
    
     

    
  }

}
