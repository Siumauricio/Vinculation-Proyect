import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { RolPrivilege } from '../../interfaces/rol-privilege';
import { RolPrivilegeService } from '../../rol_privilege.service';

@Component({
  selector: 'app-rol-privilege-delete',
  templateUrl: './rol-privilege-delete.component.html',
  styleUrls: ['./rol-privilege-delete.component.css']
})

export class RolPrivilegeDeleteComponent implements OnInit {
  rolPrivilegeFilterSelected: string = '';
  rolPrivilegeData: RolPrivilege[];
  buttonDisabled: boolean;

  constructor(private rolPrivilegeService: RolPrivilegeService) {
  
  }

  async ngOnInit() {
    this.buttonDisabled=false;
  }

  async getRolPrivilegeById(idRolPrivilege: string) {
    await this.rolPrivilegeService.getRolPrivilegeById(+idRolPrivilege).then((resp) => {
      this.rolPrivilegeData = resp;
    });
  }

    async deleteRolPrivilege(idRolPrivilege: number) {
      Swal.fire({
        title: '¿Seguro que desea eliminar el dato?',
        text: 'No podras revertir el cambio',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Si, eliminar',
      }).then(async (result) => {
        if (result.isConfirmed) {
          await this.rolPrivilegeService.deleteRolPrivilege(idRolPrivilege).then((resp) => {
            console.log(resp);
            if (resp == true) {
              this.rolPrivilegeData = null;
              this.rolPrivilegeData.splice(
                this.rolPrivilegeData.findIndex((rolPrivilege) => rolPrivilege.idRolPrivilege == idRolPrivilege),
                1
              );
            }
          });
        }
      });
    }

}
