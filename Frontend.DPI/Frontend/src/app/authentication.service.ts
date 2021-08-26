import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './users/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLoggedIn:boolean;
  public currentUser:Observable<User>;

  constructor(private http: HttpClient) { 
    this.isLoggedIn = false;
  }

  login() {
    this.isLoggedIn = true;
  }

}
