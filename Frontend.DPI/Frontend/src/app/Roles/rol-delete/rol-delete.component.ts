import { RolesService } from './../roles.service';
import { Rol } from './../../users/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-rol-delete',
  templateUrl: './rol-delete.component.html',
  styleUrls: ['./rol-delete.component.css']
})
export class RolDeleteComponent {

  userFilterSelected: string = '';
  rolsData: Rol[] ;

  constructor(private rolesService: RolesService) {}
  async getRolbyName(rolName: string) {
    console.log(rolName)
    await this.rolesService.getRolByName(rolName.trim()).then((resp) => {
      this.rolsData = resp;
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
          await this.rolesService.DeleteRol(username).then((resp) => {
            console.log(resp);
            if (resp == true) {
              this.rolsData = null;
              this.userFilterSelected ='';
            }else{

            }
          });
        }
      });
    }

}
