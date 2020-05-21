import { Component, OnInit } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ToastrService } from 'ngx-toastr';
import { ApiService } from '../api.service';
import { CookieService } from 'ngx-cookie-service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
/* import Swal from 'sweetalert2/dist/sweetalert2.js' */



@Component({
  selector: 'app-trainer',
  templateUrl: './trainer.component.html',
  styleUrls: ['./trainer.component.css']
})
export class TrainerComponent implements OnInit {

  constructor(public toastr: ToastrService,
    private ApiService: ApiService,
     private cookieService: CookieService, private router: Router, private route: ActivatedRoute) {

  }


  currentPage: string = "list";
  p: number = 1;
  taskid: string;
  imageUrl = environment.imageUrl;

  imgSrc: string ="assets/img/image-placeholder.jpg";
  selectedImage: any = null;
  isSubmitted: boolean;
  show_students:any[];
  show_trainer:any[];
  show_wlyAlamer:any[];
  show_blockedstudent:any[];
  show_blockedwlyamer:any[];
  show_blockedtrainer:any[];

  Userform = new FormGroup({
    cash: new FormControl('', Validators.required),
    user_id: new FormControl('',),
  })


  Userformx = new FormGroup({
    comission: new FormControl('', Validators.required),
    user_id: new FormControl('',),
   
  })


  ngOnInit() {

    
      this.ApiService.show_trainer().subscribe(
        res => {
          let resources: any[] = res["data"];
          this.show_trainer=resources;
      
        });

        
 
     this.ApiService.show_blockedtrainer().subscribe(
       res => {
         let resources: any[] = res["data"];
         this.show_blockedtrainer=resources;
     
       });
      
              
            
    
    this.resetForm();

  }

  
  deleteTask2(){

  }
  deleteFile(){
    console.log("Deleted")
  }
   
  comission(formValue) {

    if (this.Userformx.valid) {
      formValue["user_id"]=this.taskid;
      this.ApiService.update_commission(formValue).subscribe(
        res => {
  
          let message: any = res["message"];

            this.toastr.success(' ', message);
            this.resetForm();
            this.ngOnInit();
            this.currentPage = "list";

          });
       
      
    } else {
      this.toastr.warning('Please fill out all fields correctly', '');

    }


  }
  onSubmit(formValue) {
    if (this.Userform.valid) {


      formValue["user_id"]=this.taskid;
      this.ApiService.recharge_wallet(formValue).subscribe(
        res => {
  
          let message: any = res["message"];

            this.toastr.success(' ', message);
            this.resetForm();
            this.ngOnInit();
            this.currentPage = "list";

          });
       
      
    } else {
      this.toastr.warning('Please fill out all fields correctly', '');

    }


  }


  wallet(page,id) {
    this.currentPage = page;
    this.taskid = id;

   }
 


  get formControls() {
    return this.Userform['controls'];
  }



  showPreview(event: any) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      reader.onload = (e: any) => this.imgSrc = e.target.result;
      reader.readAsDataURL(event.target.files[0]);
      this.selectedImage = event.target.files[0];
    }
    else {
      this.imgSrc ="assets/img/image-placeholder.jpg" ;
      
      this.selectedImage = null;
    }
  }


  resetForm() {
    this.Userform.reset();
   
  }


  showPage(page: string) {
    this.currentPage = page;
    this.ngOnInit()
  }


 



   deleteTask(id) {

  
    
     

       this.ApiService.block_user(id).subscribe(
         res => {
  
           this.ngOnInit();
         });
  

        
       
 
   
  }
 

  unblock_user(id) {

  
    
      this.ApiService.unblock_user(id).subscribe(
        res => {
 
          this.ngOnInit();
        });
      }

      
      
    

  
 } 



