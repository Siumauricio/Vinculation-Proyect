import { PoliceRecord } from './../criminals/Interfaces/criminal-interface';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { WEB_SERVICE } from '../configurations/config';

@Injectable({
  providedIn: 'root'
})
export class PoliceRecordService {

  constructor(private http: HttpClient) { }


  async createPoliceRecord(criminal:PoliceRecord ) {


    const url = `${WEB_SERVICE}PoliceRecord/CreatePoliceRecord`;
    let answer: any = {};
    await this.http
      .post(url, criminal)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer) this.succesMessage('¡Se han ingresado los datos con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('DNI de sospechoso aun no existe');
      });

    return answer;
  }


  async getPoliceRecords(){
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando usuarios',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}PoliceRecord/GetPoliceRecords`;

    let answer: any;

    await this.http.get(url).toPromise()
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

  async getPoliceRecordByDNI(dni: string) {
    const url = `${WEB_SERVICE}PoliceRecord/GetPoliceRecordsByDNI?dniSuspect=${dni}`;
    let answer: any = {};
    await this.http
      .get(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;

      })
      .catch(async (error) => {
        this.errorMessage('Error estrayendo datos');
      });

    return answer;
  }

  async getCriminalGroups(){

    const url = `${WEB_SERVICE}CriminalGroup/GetCriminalGroups`;

    let answer: any;

    await this.http.get(url).toPromise()
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

  async updatePoliceRecord(policeRecord:PoliceRecord) {

    const url = `${WEB_SERVICE}PoliceRecord/ModifyPoliceRecord`;
    let answer: any = {};
    await this.http
      .post(url, policeRecord)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se han modificado los datos con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Erro al modificar los datos');
      });

    return answer;
  }


  
  async deletePoliceRecord(policeRecordid) {

    const url = `${WEB_SERVICE}PoliceRecord/DeletePoliceRecord?idPoliceRecord=${policeRecordid}`;
    let answer: any = {};
    await this.http
      .delete(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se han modificado los datos con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Erro al modificar los datos');
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


