import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { WEB_SERVICE } from 'src/app/configurations/config';
import { newUserRolPrivilege } from './interfaces/user-rol-privilege';
import { $$ } from 'protractor';

@Injectable({
  providedIn: 'root',
})
export class UserRolPrivilegesService {
  constructor(private http: HttpClient) {}

  async getUserRolPrivileges() {
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando listado de privilegios por usuario',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}Privilege/GetUserRolPrivileges`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        Swal.close();
        answer = ApiAnswer;
      })
      .catch(async (ApiAnswer) => {
        Swal.close();
        this.errorMessage('Error extrayendo datos');
      });
    return answer;
  }

  
  async getUsers() {
    const url = `${WEB_SERVICE}User/GetUsers`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (ApiAnswer) => {
        this.errorMessage('Error extrayendo usuarios');
      });
    return answer;
  }

  async getRolPrivileges() {
    const url = `${WEB_SERVICE}Privilege/GetRolPrivileges`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (ApiAnswer) => {
        this.errorMessage('Error extrayendo Privilegios');
      });
    return answer;
  }


  async createUserRolPrivilege(userRolPrivilege ) {
    let body = <newUserRolPrivilege>{
      userUsername: userRolPrivilege.username,
      specialPrivilege: +userRolPrivilege.specialPrivilege,
      idRolPrivilege: userRolPrivilege.idRolPrivileges
    };
    const url = `${WEB_SERVICE}Privilege/AddUserRolPrivilege`;
    let answer: any = {};
    await this.http
      .post(url, body)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer) this.succesMessage(`¡Se ha agregado el privilegio al usuario ${body.userUsername} con exito!`);
//es aqui
      })
      .catch(async (error) => {
        this.errorMessage(`Error agregando el privilegio al usuario ${body.userUsername}`);
      });
    return answer;
  }


  async getUserRolPrivilegeByUsername(username: string) {
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando privilegios del usuario',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}Privilege/GetUserRolPrivilegesByUser?username=${username}`;
    let answer: any = {};
    await this.http
      .post(url,username)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        Swal.close();
        answer = ApiAnswer;
        this.succesMessage('Usuario encontrado satisfactoriamente');
      })
      .catch(async (error) => {
        Swal.close();
        this.errorMessage('Error extrayendo datos del usuario');
      });

    return answer;
  }


  async DeleteUserRolPrivilege(IdUserRolPrivilege: number) {
    const url = `${WEB_SERVICE}Privilege/DeleteUserRolPrivilegeById?IdUserRolPrivilege=${IdUserRolPrivilege}`;
    let answer: any = {};
    await this.http
      .delete(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se ha eliminado el privilegio con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error al eliminar el privilegio');
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
