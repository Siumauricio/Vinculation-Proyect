import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Department, Rol, User } from '../../interfaces/user';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { UsersService } from '../../users.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-user-delete',
  templateUrl: './user-delete.component.html',
  styleUrls: ['./user-delete.component.css']
})
export class UserDeleteComponent implements OnInit {
  newUser: User = {} as User;
  userFilterSelected: string = 'enriquecs';
  userData: User[];
  buttonDisabled: boolean;

  constructor(private userService: UsersService) {

  }

  async ngOnInit() {
    this.buttonDisabled=false;
  }

  async getUserByUsername(username: string) {
    await this.userService.getUserByUsername(username).then((resp) => {
      this.userData = resp;
      this.newUser = resp;
    });
  }
    async deleteUser(username: string) {
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
          await this.userService.DeleteUser(username).then((resp) => {
            if (resp == true) {
              this.userFilterSelected='';
              this.userData = null;
              this.userData.splice(
                this.userData.findIndex((user) => user.username == username),
                1
              );
            }
          });
        }
      });
    }

}
