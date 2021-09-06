import { User, Rol } from '../users/interfaces/user';
import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class PrivilegesService {
  constructor(private http: HttpClient) {}


  async getPrivileges(){
    const url = `${WEB_SERVICE}Privilege/GetPrivileges`;
    let answer: any = {};
    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (error) => {
        this.errorMessage('Fallo al Obtener Privilegios');
        
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
