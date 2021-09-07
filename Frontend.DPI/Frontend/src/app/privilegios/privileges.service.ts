import { User, Rol } from '../users/interfaces/user';
import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class PrivilegesService {
  constructor(private http: HttpClient) {}
  token:any;

  async getPrivileges(){
    
    const url = `${WEB_SERVICE}Privilege/GetPrivileges` ;
    let answer: any = {};
  this.token = JSON.parse(localStorage.getItem('Token'));

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (error) => {
        this.errorMessage('Fallo al Obtener Privilegios');
        console.log(error);
      });
      return answer;
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
