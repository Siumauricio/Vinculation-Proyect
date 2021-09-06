import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { AuthenticationService } from '../authentication.service';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from './interfaces/user';
@Injectable({
  providedIn: 'root',
})
export class UsersService {
  privilegeType:any[]
  constructor(private http: HttpClient,private auth:AuthenticationService) {}

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
        this.errorMessage('Error extrayendo departamentos 1');
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
        this.errorMessage('Error extrayendo departamentos 2');
      });
    return answer;
  }

  async GetPrivilegesByUser(username) {
    const url = `${WEB_SERVICE}Privilege/GetUserRolPrivilegesByUser?username=${username}`;
    let answer: any;
    await this.http.post(url,username).toPromise().then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (respuestaApi) => {
      });
    return answer;
  }
  async loadPrivilegesUser(){
    await  this.GetPrivilegesByUser(this.auth.currentUser.username).then((resp)=>{
      this.auth.privileges=resp;
      localStorage.setItem("Privileges",JSON.stringify(resp));
      localStorage.setItem("SizePrivileges",resp.length);
     });
     this.privilegeType = this.getUniqueValuesFromPrivilegeType();
     console.log(this.privilegeType)
     return this.privilegeType;
  }
  
  getUniqueValuesFromPrivilegeType(){
    const unique = [...new Set(this.auth.privileges.map(item => item.tipo_privilegio))];
    let privileges = [];
    for (let i = 0; i < unique.length; i++) {
      let namePrivileges = [];
      for (let j = 0; j < this.auth.privileges.length; j++) {
        if (this.auth.privileges[j].tipo_privilegio == unique[i]) {
          namePrivileges.push(this.auth.privileges[j].name_Privilege);
        }
    }
        const object = {
          privilegeType : unique[i],
          privilege : namePrivileges
        }
        privileges.push(object);
    }
  
    return privileges;
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
