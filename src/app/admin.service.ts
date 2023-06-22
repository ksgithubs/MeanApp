import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private hc: HttpClient) { }

  createProduct(userObject):Observable<any> {
    return this.hc.post('/admin/createProduct',userObject)

  }
}
