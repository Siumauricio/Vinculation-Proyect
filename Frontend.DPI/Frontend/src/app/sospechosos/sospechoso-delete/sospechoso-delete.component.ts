import { SuspectService } from './../suspect.service';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { Suspects } from '../interfaces/suspects';

@Component({
  selector: 'app-sospechoso-delete',
  templateUrl: './sospechoso-delete.component.html',
  styleUrls: ['./sospechoso-delete.component.css']
})
export class SospechosoDeleteComponent {


  userFilterSelected: string = '';
  suspectData: Suspects ;

  constructor(private suspectService: SuspectService) {}


  async getSuspectByDni(dniSuspect: string) {
    await this.suspectService.getSuspectByDNI(dniSuspect.trim()).then((resp) => {
      if (resp) {
        console.log(resp)
        this.suspectData = resp;
      }
    });
  }
    async DeleteSuspect(dni: string) {
      Swal.fire({
        title: '¿Seguro que desea eliminar el usuario?',
        text: 'No podras revertir el cambio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.suspectService.deleteSuspect(dni.trim()).then((resp) => {
            if (resp == true) {
              this.suspectData = null;
              this.userFilterSelected ='';
            }else{

            }
          });
        }
      });
    }
}
