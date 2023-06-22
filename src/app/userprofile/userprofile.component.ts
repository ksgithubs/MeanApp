import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';
import { UserService } from '../user.service';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.css']
})
export class UserprofileComponent implements OnInit {

  user : any;

  constructor( private authService:AuthenticationService
    ,private userService:UserService) { }

  ngOnInit(): void {
    this.user=this.authService.currentUser;
  }


  getPrivateData(){

    this.userService.getProtectedData().subscribe({
      next:(res)=>{
        alert(res.message);
      }
    })
  }

}
