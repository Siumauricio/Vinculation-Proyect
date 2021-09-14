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
      await this.http
        .post(url, suspect)
        .toPromise()
        .then(async (ApiAnswer: any) => {
          answer = ApiAnswer;
          if (answer) this.succesMessage('¡Se ha agregado el sospechos con exito!');
        })
        .catch(async (error) => {
          this.errorMessage('Error asegurese que este sospechoso no existe');
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
      });
      return answer;
    }

    async getSuspectsInsertedTodayByUser(username:string){
      const url = `${WEB_SERVICE}Suspect/GetRegisterPerDayPerUser?username=${username}`;
      let answer: any = {};
      await this.http
        .get(url)
        .toPromise()
        .then(async (ApiAnswer: any) => {
          answer = ApiAnswer;
        })
        .catch(async (error) => {
          this.errorMessage('Error Al Obtener Sospechosos');
        });
        return answer;
      }

      async getSuspectsInsertedToday(){
        const url = `${WEB_SERVICE}Suspect/GetRegisterPerDay`;
        let answer: any = {};
        await this.http
          .get(url)
          .toPromise()
          .then(async (ApiAnswer: any) => {
            answer = ApiAnswer;
          })
          .catch(async (error) => {
            this.errorMessage('Error Al Obtener Sospechosos');
          });
          return answer;
        }
     
      async getSuspectByDNI(dni:string){
        const url = `${WEB_SERVICE}Suspect/GetSuspectByDNI?dni=${dni}`;
        let answer: any = {};
        await this.http
          .get(url)
          .toPromise()
          .then(async (ApiAnswer: any) => {
            answer = ApiAnswer;
          })
          .catch(async (error) => {
            this.errorMessage('Error Al Obtener Sospechosos');
          });
          return answer;
        }


      async deleteSuspect(dni:string){
        const url = `${WEB_SERVICE}Suspect/DeleteSuspect?DNI=${dni}`;
        let answer: any = {};
        await this.http
          .delete(url)
          .toPromise()
          .then(async (ApiAnswer: any) => {
            answer = ApiAnswer;
            if (ApiAnswer) {
              this.succesMessage('Usuario Eliminado Correctamente!');
            }
          })
          .catch(async (error) => {
            this.errorMessage('Error Al Eliminar Sospechoso2');
          });
          return answer;
        }


        async updateSuspect(dniLast,suspect){
          const url = `${WEB_SERVICE}Suspect/UpdateSuspect?lastDNI=${dniLast}`;
          let answer: any = {};
          await this.http
            .post(url,suspect)
            .toPromise()
            .then(async (ApiAnswer: any) => {
              answer = ApiAnswer;
              if (ApiAnswer) {
                this.succesMessage('Sospechoso Modificado Correctamente!');
              }
            })
            .catch(async (error) => {
              this.errorMessage('Error Al Modificar Sospechoso');
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
