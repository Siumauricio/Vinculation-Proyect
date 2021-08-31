import { User, Rol } from '../users/interfaces/user';
import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  constructor(private http: HttpClient) {}


  async createDepartment(Departmentname:string){
      const url = `${WEB_SERVICE}Department/AddDepartment?name=${Departmentname}`;
      let answer: any = {};
      await this.http
        .post(url, Departmentname)
        .toPromise()
        .then(async (ApiAnswer: any) => {
          answer = ApiAnswer;
          if (answer) this.succesMessage('¡Se ha creado el Departamento con exito!');
        })
        .catch(async (error) => {
          this.errorMessage('Error creando un nuevo Departamento');
          console.log(error);
        });
      return answer;
  }

  async getDepartmentByName(Departmentname:string){
    const url = `${WEB_SERVICE}Department/GetDepartmentByName?departmentName=${Departmentname}`;
    let answer: any = {};
    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer) this.succesMessage('Departamento Obtenido Con Exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Este Departamento No Existe');
        console.log(error);
      });
      return answer;
    }
    async DeleteDepartment(Departmentname:string){
      const url = `${WEB_SERVICE}Department/DeleteDepartment?departmentName=${Departmentname}`;
      let answer: any = {};
      await this.http
        .delete(url)
        .toPromise()
        .then(async (ApiAnswer: any) => {
          answer = ApiAnswer;
          if (answer) 
          this.succesMessage('Departamento Eliminado Con Exito!');
        })
        .catch(async (error) => {
          this.errorMessage('Fallo Al Eliminar Este Departamento');
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
