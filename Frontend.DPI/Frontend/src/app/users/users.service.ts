import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
import { User } from './interfaces/user';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http:HttpClient
) { }

  async getUsuers(){

    const url =  `${WEB_SERVICE}User/getUsers`;

    let respuesta:any

    await this.http.get(url)
    .toPromise()
    .then(async (respuestaApi:any)=>{
      Swal.close()
      respuesta = respuestaApi

    })
    .catch(async respuestaApi =>{
      Swal.close()
      this.errorCarga();

    });
      return respuesta;
  }

  async getRols(){
    const url =  `${WEB_SERVICE}Roles/GetRols`;

    let respuesta:any

    await this.http.get(url)
    .toPromise()
    .then(async (respuestaApi:any)=>{
      Swal.close()
      respuesta = respuestaApi

    })
    .catch(async respuestaApi =>{
      Swal.close()
      this.errorCarga();

    });
      return respuesta;
  }

  async getDepartments(){
    const url =  `${WEB_SERVICE}Department/GetDepartments`;

    let respuesta:any

    await this.http.get(url)
    .toPromise()
    .then(async (respuestaApi:any)=>{
      Swal.close()
      respuesta = respuestaApi

    })
    .catch(async respuestaApi =>{
      Swal.close()
      this.errorCarga();

    });
      return respuesta;
  }

  async createUser(user:User){

      let body={
        username : user.username,
        password: user.password,
        departmentIdDepartment: Number(user.departmentIdDepartment),
        rolIdRol: Number(user.rolIdRol)
      }
      console.log(body);

      const url =`${WEB_SERVICE}User/AddUser`
      let respuesta:any = {}
      await this.http.post(url, body ).toPromise()
      .then(async (respuestaApi:any)=>{
          Swal.close()
          respuesta = respuestaApi
        }).catch(async (error) =>{
        Swal.close()
        this.errorCarga()
        console.log(error);
    });

    return respuesta;

  }


  errorCarga(){
    Swal.fire({
      title:'Error',
      text:'Servicio no disponible',
      icon:'error'
    })
  }


}

