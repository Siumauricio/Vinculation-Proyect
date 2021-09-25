import { PoliceRecordService } from './../police.record.service';
import { PoliceRecord } from './../../criminals/Interfaces/criminal-interface';
import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { CriminalGroup } from '../../criminals/Interfaces/criminal-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-police-record-delete',
  templateUrl: './police-record-delete.component.html',
  styleUrls: ['./police-record-delete.component.css']
})
export class PoliceRecordDeleteComponent  {
  policeRecord: PoliceRecord[];
  dniCriminal: string;
  rolTemporal
  userFilterSelected
  totalRecords :number;
  page:number =1;
  constructor(
    private criminalService:PoliceRecordService
  ) { }

  async getPoliceRecords(dni: string) {
    this.dniCriminal = dni;
    console.log(this.policeRecord)
    console.log(this.dniCriminal)
    await this.criminalService.getPoliceRecordByDNI(dni.trim()).then((resp) => {
      this.policeRecord = resp;
    
      console.log(resp)
    });
  }
  //050118090223305
    async DeletePoliceRecord(id) {
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
          await this.criminalService.deletePoliceRecord(id).then(async (resp) => {
            if (resp == true) {
              this.policeRecord = null;
             await this.getPoliceRecords( this.dniCriminal);
            }else{

            }
          });
        }
      });
    }
    
    keyPressAlphanumeric(event) {
      var inp = String.fromCharCode(event.keyCode);
      if (/^[a-zA-Z0-9_ ]*$/.test(inp)) {
        return true;
      } else {
        event.preventDefault();
        return false;
      }
    }

}
