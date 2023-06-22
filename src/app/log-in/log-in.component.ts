import { Component, OnInit } from '@angular/core';

import {FormControl, FormBuilder,FormGroup,FormArray} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {


  constructor(private router:Router,
  private authService :AuthenticationService, 
  private fb:FormBuilder,
  private userService :UserService) { }
  userForm:FormGroup;
  errOutput:string;
  errOutputStatus: boolean;




  afterSubmit(){
    console.log(this.userForm.value); 
    
    if(this.userForm.value.userType=='admin'){
      this.authService.loginAdmin(this.userForm.value).subscribe({
      next:(res)=>{
        if (res.message=="success"){
          this.errOutputStatus = false;

          let token =res.token;

          localStorage.setItem("token",token)
          // update user login status
          this.authService.userLoginStatus=true;

          this.authService.currentUser = res.user;
          //navigate to userdashboard    
          this.router.navigateByUrl('/admin')

        }
        else{

          this.errOutputStatus = true;
           this.errOutput = res.message;
        }
      },
    error:(err)=>{
      console.log(err)
      alert(err.message);
    }
      })
    }

    else if(this.userForm.value.userType=='user'){
      this.authService.loginUser(this.userForm.value).subscribe({
      next:(res)=>{
        if (res.message=="success"){
          this.errOutputStatus = false;

          let token =res.token;

          localStorage.setItem("token",token)
          // update user login status
          this.authService.userLoginStatus=true;

          this.authService.currentUser = res.user;
          //navigate to userdashboard    
          this.router.navigateByUrl(`/userprofile/${res.user.username}`)

        }
        else{

          this.errOutputStatus = true;
           this.errOutput = res.message;
          
        }
      },
    error:(err)=>{
      console.log(err)
      alert(err.message);
    }

      })

    }
   
  }

  ngOnInit(): void {
    this.userForm=this.fb.group({
      username:'',
      password:'',
      userType:''
      

    })


  }

}
