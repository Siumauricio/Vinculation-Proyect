import { Suspects } from './interfaces/suspects';
import { Injectable } from '@angular/core';
import { WEB_SERVICE } from '../configurations/config';
import { HttpClient } from '@angular/common/http';
import Swal from 'sweetalert2';
@Injectable({
  providedIn: 'root',
})
export class SuspectService {
  constructor(private http: HttpClient) {}


  async addSuspect(suspect:Suspects){
      const url = `${WEB_SERVICE}Suspect/AddSuspect`;
      let answer: any = {};
      console.log(url)
      console.log(suspect)
      await this.http
        .post(url, suspect)
        .toPromise()
        .then(async (ApiAnswer: any) => {
          answer = ApiAnswer;
          if (answer) this.succesMessage('¡Se ha agregado el sospechos con exito!');
        })
        .catch(async (error) => {
          this.errorMessage('Error asegurese que este sospechoso no existe');
          console.log(error);
        });
  
      return answer;
  }

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

    async getSuspectsInsertedToday(username:string){
      const url = `${WEB_SERVICE}Suspect/GetRegisterPerDay?username=${username}`;
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
