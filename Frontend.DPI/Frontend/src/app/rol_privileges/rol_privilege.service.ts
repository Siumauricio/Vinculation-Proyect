import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { CreateRolPrivilege } from './interfaces/rol-privilege';

@Injectable({
  providedIn: 'root',
})
export class RolPrivilegeService {
  constructor(private http: HttpClient) {}

  async getRolPrivileges() {
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando Roles por privilegios',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}Privilege/GetRolPrivileges`;

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



  async getRols() {
    const url = `${WEB_SERVICE}Roles/GetRols`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (ApiAnswer) => {
        this.errorMessage('Error extrayendo roles');
      });
    return answer;
  }

  async getPrivileges() {
    const url = `${WEB_SERVICE}Privilege/GetPrivileges`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (ApiAnswer) => {
        this.errorMessage('Error extrayendo privilegios');
      });
    return answer;
  }
  

  async createRolPrivilege(createRolPrivilege: CreateRolPrivilege) {
    let body = {
      rolIdRol: createRolPrivilege.rolIdRol,
      privilegeIdPrivilege: createRolPrivilege.privilegeIdPrivilege
    };

    const url = `${WEB_SERVICE}Privilege/CreateRolPrivilege`;
    let answer: any = {};
    await this.http
      .post(url, body)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer) this.succesMessage('¡Se ha creado el rol por privilegio!');
      })
      .catch(async (error) => {
        this.errorMessage('Error creando rol por privilegio');
        console.log(error);
      });

    return answer;
  }


  async getRolPrivilegeByName(nameRolPrivilege: string) {
    const url = `${WEB_SERVICE}Privilege/GetRolPrivilegeByName?NameRolPrivilege=${nameRolPrivilege}`;
    let answer: any = {};
    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        this.succesMessage('Rol por privilegio encontrado satisfactoriamente');
      })
      .catch(async (error) => {
        this.errorMessage('Error extrayendo datos');
        console.log(error);
      });

    return answer;
  }


  async deleteRolPrivilege(idRolPrivilege: number) {
    const url = `${WEB_SERVICE}Privilege/DeleteRolPrivilegeById?idRolPrivilege=${idRolPrivilege}`;
    let answer: any = {};
    await this.http
      .delete(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se han eliminado el dato con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error al eliminar el rol por privilegio');
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
