import { Component, OnInit } from '@angular/core';
import{FormGroup,FormBuilder} from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  userFormInfo:FormGroup;
  errMsg:string='';
  errStatus:boolean=false;

  image:File;


  constructor(private fb:FormBuilder,
    private userService:UserService,
    private router:Router) { }

  ngOnInit(): void {

    this.userFormInfo=this.fb.group({

      username:"",
      password:"",
      email:"",
      city:"",
      profilePic:""

    })
  }
  onFormSubmit(){
    
    let userObj =this.userFormInfo.value;
    
    let formData=new FormData();

    formData.append('userObj', JSON.stringify(userObj))

    formData.append('profilePic',this.image)

    // console.log(this.userObj.value)
    this.userService.createUser(formData).subscribe({
      
      next:(res)=>{
        if(res.message=="User Created"){
          this.errStatus= false;

          //navigate to login page
          this.router.navigateByUrl("/login")
        }
        else{ 
          this.errStatus=true;
          this.errMsg=res.message;
  
        }

      },
      error:()=>{
      }
    })
  }

  onFileSelect(event) {
    
    // console.log(event.target.files[0])
    // console.log(event)

    this.image=event.target.files[0]

  }

}
