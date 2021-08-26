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
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando usuarios',
      didOpen: () => {
        Swal.showLoading()
      }
    })
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
      this.errorMessage('Erro extrayendo datos de usuarios');

    });
      return respuesta;
  }

  async getRols(){
    const url =  `${WEB_SERVICE}Roles/GetRols`;

    let respuesta:any

    await this.http.get(url)
    .toPromise()
    .then(async (respuestaApi:any)=>{
      respuesta = respuestaApi
    })
    .catch(async respuestaApi =>{
      this.errorMessage('Error extrayendo roles');
    });
      return respuesta;
  }

  async getDepartments(){
    const url =  `${WEB_SERVICE}Department/GetDepartments`;

    let respuesta:any

    await this.http.get(url)
    .toPromise()
    .then(async (respuestaApi:any)=>{
      respuesta = respuestaApi
    })
    .catch(async respuestaApi =>{
      this.errorMessage('Error extrayendo departamentos');

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
          respuesta = respuestaApi
          if(respuesta)
          this.succesMessage('¡Se ha creado el usuario con exito!');
        }).catch(async (error) =>{
        this.errorMessage('Error creando un nuevo usuario')
        console.log(error);
    });

    return respuesta;

  }

  async getUserByUsername(user:User){

    const url =`${WEB_SERVICE}User/UserById?username=${ user.username}`
    let respuesta:any = {}
    await this.http.get(url).toPromise()
    .then(async (respuestaApi:any)=>{
        respuesta = respuestaApi
      }).catch(async (error) =>{
      this.errorMessage('Error estrayendo datos del usuarios')
      console.log(error);
  });

  return respuesta;

  }


  async updtUser(user:User){

      let body={
        username : user.username,
        password: user.password,
        departmentIdDepartment: Number(user.departmentIdDepartment),
        rolIdRol: Number(user.rolIdRol)
      }
      console.log(body);

      const url =`${WEB_SERVICE}User/UpdateUser`
      let respuesta:any = {}
      await this.http.post(url, body ).toPromise()
      .then(async (respuestaApi:any)=>{
          respuesta = respuestaApi
          if(respuesta)
          this.succesMessage('¡Se ha modificado el usuario con exito!');
        }).catch(async (error) =>{
        this.errorMessage('Error al modificar datos de usuario')
        console.log(error);
    });

    return respuesta;
  }




  succesMessage(message){
    Swal.fire({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500
    })
  }


  errorMessage(message){
    Swal.fire({
      title:'Error',
      text:message,
      icon:'error'
    })
  }


}

