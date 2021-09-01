import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from './interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private http: HttpClient) {}

  async getUsuers() {
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando usuarios',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}User/getUsers`;

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
        this.errorMessage('Error extrayendo datos de usuarios');
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

  async getDepartments() {
    const url = `${WEB_SERVICE}Department/GetDepartments`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (ApiAnswer) => {
        this.errorMessage('Error extrayendo departamentos');
      });
    return answer;
  }

  async createUser(user: User) {
    let body = {
      username: user.username,
      password: user.password,
      departmentIdDepartment: Number(user.departmentIdDepartment),
      rolIdRol: Number(user.rolIdRol),
    };
    console.log(body);

    const url = `${WEB_SERVICE}User/AddUser`;
    let answer: any = {};
    await this.http
      .post(url, body)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer) this.succesMessage('¡Se ha creado el usuario con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error creando un nuevo usuario');
        console.log(error);
      });

    return answer;
  }

  async getUserByUsername(username: string) {
    const url = `${WEB_SERVICE}User/UserById?username=${username}`;
    let answer: any = {};
    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        this.succesMessage('Usuario encontrado satisfactoriamente');
      })
      .catch(async (error) => {
        this.errorMessage('Error estrayendo datos del usuarios');
        console.log(error);
      });

    return answer;
  }

  async updtUser(user: User) {
    let body = {
      username: user.username,
      password: user.password,
      departmentIdDepartment: Number(user.departmentIdDepartment),
      rolIdRol: Number(user.rolIdRol),
    };
    console.log(body);

    const url = `${WEB_SERVICE}User/UpdateUser`;
    let answer: any = {};
    await this.http
      .post(url, body)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se ha modificado el usuario con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error al modificar datos de usuario');
        console.log(error);
      });

    return answer;
  }

  async getRolPriviliges() {
    const url = `${WEB_SERVICE}Privilege/GetRolPrivilege`;

    let answer: any;

    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (respuestaApi) => {
        this.errorMessage('Error extrayendo departamentos');
      });
    return answer;
  }

  async updtUserPrivilege(
    idRolPrivilege: number,
    username: string,
    specialPrivilege: number
  ) {
    let body = {
      userUsername: username,
      idRolPrivilege: idRolPrivilege,
      specialPrivilege: specialPrivilege,
    };
    console.log(body);

    const url = `${WEB_SERVICE}Privilege​/AddUserRolPrivilege`;
    let answer: any = {};
    await this.http
      .post(url, body)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se han asignado los privilegios con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error al asignar privilegios de usuario');
        console.log(error);
      });

    return answer;
  }

  async DeleteUser(username: string) {
    const url = `${WEB_SERVICE}User/DeleteUser?username=${username}`;
    let answer: any = {};
    await this.http
      .delete(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se han eliminado el usuario con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error al eliminar el usuario');
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
