import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { WEB_SERVICE } from './configurations/config';
import { User } from './users/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public isLoggedIn:boolean;
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser:User;
  openSidebar:boolean=false;

  constructor(private http: HttpClient) {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  async login(user, password) {

    let response:any;
    try {
      await this.http.get(`${WEB_SERVICE}User/UserById?username=${user}`)
        .toPromise()
        .then(res => {
          if (res) this.succesMessage('Bienvenido');
          response = res;
        })
        .catch(err => {});
      console.log(response);

      if (password === response.password) {
        this.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(response));
        this.currentUserSubject.next(response);
        localStorage.setItem("isLoggedIn", "true");
        this.currentUser = response;
      }

      return this.isLoggedIn;
    } catch (error) {
      return false;
    }
  }

  logout(){
    this.isLoggedIn = false;
    localStorage.setItem("isLoggedIn", "false");
    localStorage.removeItem('currentUser');
  }

  succesMessage(message) {
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    });
  }
  
}
