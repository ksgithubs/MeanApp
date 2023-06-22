import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from 'src/app/user.service';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.css']
})
export class CreateProductComponent implements OnInit {

  image:File;
  
  errMsg:string='';
  errStatus:boolean=false;

  userFormInfo:FormGroup;


  constructor ( private fb:FormBuilder, private userService:UserService,private router:Router) { }

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

    console.log(this.userFormInfo.value)
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
