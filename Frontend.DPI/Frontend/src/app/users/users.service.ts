import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor( private http:HttpClient
) { }

  async getUsuers(){
    const url =  `${WEB_SERVICE}User/getUsers`;
    let body={}

  let respuesta:any

  await this.http.post(url, body, ).toPromise()
  .then(async (respuestaApi:any)=>{
    Swal.close()
    respuesta = respuestaApi

  })
  .catch(async respuestaApi =>{
    Swal.close()
    Swal.fire({
      title:'Error',
      text:'Servicio no disponible',
      icon:'error'
    })

  });
    return respuesta;
 }

}

