import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { WEB_SERVICE } from './configurations/config';
import { RolPrivilege, User, UserLogin } from './users/interfaces/user';
import { JwtHelperService } from "@auth0/angular-jwt";
import { Router } from '@angular/router';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser:User;
  openSidebar:boolean=false;
  public isLoggedIn:boolean;
  public privileges:RolPrivilege;

  constructor(private http: HttpClient,
              private jwtHelper: JwtHelperService) {
    this.isLoggedIn = localStorage.getItem("isLoggedIn") === "true";
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));

  }

  async login(user, password) {

    let body=<UserLogin>{
      username:user,
      password:password
    }
    let response:any;
      await this.http.post(`${WEB_SERVICE}User/Login`,body)
        .toPromise()
        .then(async res => {
          if (res) this.succesMessage('Bienvenido');
          response = res;
        })
        .catch(async (err) => {
          this.errorMessage('La credenciales no concuerdan con los registros existentes');
        });
      if (response) {
        let userLog={
          username:response.username,
          rol:response.rol,
          department: response.department
        }
        this.isLoggedIn = true;
        localStorage.setItem('currentUser', JSON.stringify(userLog));
        localStorage.setItem('Token',response.tokenString)
        this.currentUserSubject.next(response);
        localStorage.setItem("isLoggedIn", "true");
        this.currentUser = response;
        return this.isLoggedIn
      }
      return false;
  }


  logout(){
    this.openSidebar=false;
    this.isLoggedIn = false;
    localStorage.removeItem('currentUser');
    localStorage.removeItem('Token');
    localStorage.removeItem('Privileges');
    localStorage.removeItem('SizePrivileges');
    localStorage.setItem("isLoggedIn", "false");

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


  errorMessage(message) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }
  
}
