import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { WEB_SERVICE } from '../configurations/config';
import { CriminalRecord } from '../criminals/Interfaces/criminal-interface';

@Injectable({
  providedIn: 'root'
})
export class CriminalRecordService {

  constructor(private http: HttpClient) { }


  async createRecordCriminal(criminal:CriminalRecord ) {
    const url = `${WEB_SERVICE}CriminalRecord/AddCriminalRecord`;
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


  async getCriminalRecords(){
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando usuarios',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}CriminalRecord/GetCriminalRecords`;

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

  async getCriminalByDNI(dni: string) {
    const url = `${WEB_SERVICE}CriminalRecord/GetCriminalRecordByDNI?DNI=${dni}`;
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



  async updtCriminalRecord(criminal:CriminalRecord) {

    const url = `${WEB_SERVICE}CriminalRecord/UpdateCriminalRecordByDni`;
    let answer: any = {};
    await this.http
      .put(url, criminal)
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

  async deleteCriminalRecord(criminalRecord) {

    const url = `${WEB_SERVICE}CriminalRecord/DeleteCriminalRecord?IdCriminalRecord=${criminalRecord}`;
    console.log(url)
    let answer: any = {};
    await this.http
      .delete(url)
      .toPromise()
      .then(async (ApiAnswer: any) => {
        answer = ApiAnswer;
        if (answer)
          this.succesMessage('¡Se han Eliminado los datos con exito!');
      })
      .catch(async (error) => {
        this.errorMessage('Error al Eliminar los datos');
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


