import { User, Rol } from '../users/interfaces/user';
import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SuspectService {
  constructor(private http: HttpClient) {}


  // async createRol(Rolname:string){
  //     const url = `${WEB_SERVICE}Roles/CreateRol?rolName=${Rolname}`;
  //     let answer: any = {};
  //     await this.http
  //       .post(url, Rolname)
  //       .toPromise()
  //       .then(async (ApiAnswer: any) => {
  //         answer = ApiAnswer;
  //         if (answer) this.succesMessage('¡Se ha creado el Rol con exito!');
  //       })
  //       .catch(async (error) => {
  //         this.errorMessage('Error creando un nuevo Rol');
  //         console.log(error);
  //       });
  
  //     return answer;
  // }

  async getSuspects(){
    const url = `${WEB_SERVICE}Suspect/GetSuspects`;
    let answer: any = {};
    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
      })
      .catch(async (error) => {
        this.errorMessage('Error Al Obtener Sospechosos');
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
