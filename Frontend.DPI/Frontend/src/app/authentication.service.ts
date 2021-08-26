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
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
  }

  login(user, password) {
    if (user === "test" && password === "test") {
      this.isLoggedIn = true;
      localStorage.setItem("isLoggedIn", "true");
    }

    return this.isLoggedIn;

  }

}
