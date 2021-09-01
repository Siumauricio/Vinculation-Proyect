import { Component, OnInit } from '@angular/core';
import { FormBuilder} from '@angular/forms';
import Swal from 'sweetalert2';
import { UserRolPrivilegesService } from '../../user-rol-privileges.service';
import { UserRolPrivilge } from '../../interfaces/user-rol-privilege';
import { User } from 'src/app/users/interfaces/user';

@Component({
  selector: 'app-user-rol-privilege-delete',
  templateUrl: './user-rol-privilege-delete.component.html',
  styleUrls: ['./user-rol-privilege-delete.component.css']
})

export class UserRolPrivilegeDeleteComponent implements OnInit {
  userRolPrivilegeSingle: UserRolPrivilge [];
  userRolPrivilegeFilterSelected: string = '';
  userRolPrivilegeData: UserRolPrivilge[];
  buttonDisabled: boolean;

  constructor(private userRolPrivilegeService: UserRolPrivilegesService,private formBuilder:FormBuilder) {
   
  }

  async ngOnInit() {
    this.buttonDisabled=false;
  }

  async getUserRolPrivilegeByUsername(username: string) {
    await this.userRolPrivilegeService.getUserRolPrivilegeByUsername(username).then((resp) => {
      console.log(resp);
      this.userRolPrivilegeData = resp;
      this.userRolPrivilegeSingle = resp;
    });
  }


    async deleteUserRolPrivilege(idUserRolPrivilege: number, index: number) {
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
          await this.userRolPrivilegeService.DeleteUserRolPrivilege(idUserRolPrivilege).then((resp) => {
            console.log(resp);
            if (resp == true) {
              this.userRolPrivilegeSingle[index] = null;
              this.userRolPrivilegeSingle.splice(
                this.userRolPrivilegeSingle.findIndex((userRolPrivilege) => userRolPrivilege.idUserRolPrivilege ==idUserRolPrivilege ),
                1
              );
            }
          });
        }
      });

    }

}
