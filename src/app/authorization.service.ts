import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationService  implements HttpInterceptor{

  constructor() { }

  intercept(req : HttpRequest<any>, next : HttpHandler): Observable<HttpEvent<any>>{

    let token=localStorage.getItem('token');
    if(token){
      let clonedReq = req.clone({
        headers: req.headers.set("Authorization","Bearer " +token)
      })

      return next.handle(clonedReq)
    }
    else{ 
      // next.handle(req)
      return next.handle(req)
    }
  }
}

