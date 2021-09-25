import { CriminalsService } from './../../criminals/criminals.service';
import { Criminal, CriminalRecord } from './../../criminals/Interfaces/criminal-interface';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { CriminalRecordService } from '../criminals.record.service';

@Component({
  selector: 'app-criminal-record-delete',
  templateUrl: './criminal-record-delete.component.html',
  styleUrls: ['./criminal-record-delete.component.css']
})
export class CriminalRecordDeleteComponent  {
  criminalRecords: CriminalRecord[];
  dniCriminal: string;
  rolTemporal
  userFilterSelected
  totalRecords :number;
  page:number =1;
  constructor(
    private criminalService:CriminalRecordService
  ) { }

  async getCriminalRecordByDNI(dni: string) {
    this.dniCriminal = dni;
    console.log(this.criminalRecords)
    console.log(this.dniCriminal)
    await this.criminalService.getCriminalByDNI(dni.trim()).then((resp) => {
      this.criminalRecords = resp;
    
      console.log(resp)
    });
  }
  //050118090223305
    async DeleteCriminalRecord(id) {
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
          await this.criminalService.deleteCriminalRecord(id).then(async (resp) => {
            if (resp == true) {
              this.criminalRecords = null;
             await this.getCriminalRecordByDNI( this.dniCriminal);
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
