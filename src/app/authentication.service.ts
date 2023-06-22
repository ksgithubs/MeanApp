import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable,  } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  
  userLoginStatus:boolean=false;
  currentUser:any;

  constructor( private hc:HttpClient) { 
    
  }

  loginUser(usrCredObj: any):Observable<any>{
    return this.hc.post('/user/login-user',usrCredObj)
  }
  logoutUser(){

    localStorage.removeItem("token");
    this.userLoginStatus=false;
  }
  loginAdmin(usrCredmObj):Observable<any>{
    return this.hc.post('/admin/login',usrCredmObj)


  }
}
