import { DepartmentService } from './../deparment.service';
import { Department } from './../../users/interfaces/user';
import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-departamento-delete',
  templateUrl: './departamento-delete.component.html',
  styleUrls: ['./departamento-delete.component.css']
})
export class DepartamentoDeleteComponent  {

  userFilterSelected: string = '';
  DepartmentData: Department[] ;

  constructor(private departmentService: DepartmentService) {}
  async getRolbyName(rolName: string) {
    await this.departmentService.getDepartmentByName(rolName.trim()).then((resp) => {
      this.DepartmentData = resp;
    });
  }
    async DeleteRol(username: string) {
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
          await this.departmentService.DeleteDepartment(username).then((resp) => {
            if (resp == true) {
              this.DepartmentData = null;
              this.userFilterSelected ='';
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
