import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';
import { WEB_SERVICE } from '../configurations/config';
import { Criminal } from './Interfaces/criminal-interface';

@Injectable({
  providedIn: 'root'
})
export class CriminalsService {

  constructor(private http: HttpClient) { }


  async createCriminal(criminal:Criminal ) {
    let body = {
      incidenceType: criminal.incidenceType,
      incidenceZone: criminal.incidenceZone,
      hierarchyCriminalGroup: criminal.hierarchyCriminalGroup,
      periodBelong: String(criminal.periodBelong) + ' MESES',
      operationPlace: criminal.operationPlace.toUpperCase(),
      tatooType: criminal.tatooType,
      suspectDni: criminal.suspectDni,
      criminalGroupIdCg: Number(criminal.criminalGroupIdCg),
    };

    const url = `${WEB_SERVICE}CriminalDatum/AddCriminalData`;
    let answer: any = {};
    await this.http
      .post(url, body)
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


  async getCriminals(){
    Swal.fire({
      title: 'Espere un momento',
      html: 'Cargando usuarios',
      didOpen: () => {
        Swal.showLoading();
      },
    });
    const url = `${WEB_SERVICE}CriminalDatum/GetCriminalData`;

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
    const url = `${WEB_SERVICE}CriminalDatum/GetCriminalDAtaByDni?DNI=${dni}`;
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

  async updtCriminalData(criminal:Criminal) {
    let body = {
      idCriminalData: criminal.idCriminalData,
      incidenceType: criminal.incidenceType,
      incidenceZone: criminal.incidenceZone,
      hierarchyCriminalGroup: criminal.hierarchyCriminalGroup,
      periodBelong: String(criminal.periodBelong) + ' MESES',
      operationPlace: criminal.operationPlace.toUpperCase(),
      tatooType: criminal.tatooType,
      suspectDni: criminal.suspectDni,
      criminalGroupIdCg: Number(criminal.criminalGroupIdCg),
    };

    console.log(JSON.stringify(body));

    const url = `${WEB_SERVICE}CriminalDatum/UpdateCriminalDataById`;
    let answer: any = {};
    await this.http
      .put(url, body)
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


