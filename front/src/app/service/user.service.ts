import { Injectable } from '@angular/core';
import { User } from '../interfaces/user';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserService {
  private url = 'http://localhost:3000'
  constructor(private http: HttpClient) { }
  addUser(user:User){
    return this.http.post((this.url+"/users"), user)
  }
  

  getUserByNameandPassword(user:User): Observable<User>{
    const {Correo, Pass}=user;
    return this.http.post<User>(this.url+'/login',{Correo, Pass})
  }
}
