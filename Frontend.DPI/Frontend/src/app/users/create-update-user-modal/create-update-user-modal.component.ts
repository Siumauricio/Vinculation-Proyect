import {
  Component,
  OnInit,
  Output,
  ViewChild,
  EventEmitter,
} from '@angular/core';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { Validators, FormBuilder } from '@angular/forms';
import { Rol, User, Department, RolPrivilege } from '../interfaces/user';
import { UsersService } from '../users.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-update-user-modal',
  templateUrl: './create-update-user-modal.component.html',
  styleUrls: ['./create-update-user-modal.component.css'],
})
export class CreateUpdateUserModalComponent implements OnInit {
  @ViewChild('createUserModal', { static: true })
  createUserModal: ModalDirective;
  @Output() setNewUser = new EventEmitter<boolean>();

  newUser: User = {} as User;
  passwordConfirm: string = '';
  isUpdate: boolean = false;
  correctPassword: boolean = true;

  rolsData: Rol[];
  departmentsData: Department[];

  assignPermissions: boolean = false;
  rolPrivileges: RolPrivilege[];
  constructor(private userService: UsersService) {}

  ngOnInit(): void {}

  async buildModal(user: User) {
    if (user.username != null) {
      this.isUpdate = true;
      await this.getUserByUsername(user);
    } else {
      this.newUser = user;
      this.isUpdate = false;
      this.passwordConfirm = '';
    }
    this.assignPermissions = false;
    await this.getDataDepartments();
    await this.getDataRols();

    this.createUserModal.show();
  }

  closeModal() {
    this.createUserModal.hide();
  }

  async getUserByUsername(user: User) {
    await this.userService.getUserByUsername(user.username).then((resp) => {
      this.newUser = resp;
      this.passwordConfirm = this.newUser.password;
      console.log('newUser', this.newUser);
    });
  }

  async getDataRols() {
    await this.userService.getRols().then((resp) => {
      console.log(resp);
      this.rolsData = resp;
    });
  }

  async getDataDepartments() {
    await this.userService.getDepartments().then((resp) => {
      this.departmentsData = resp;
    });
  }

  checkPasswords() {
    if (this.newUser.password != this.passwordConfirm)
      this.correctPassword = false;
    else this.correctPassword = true;
  }

  async createUser(newUser: User) {
    console.log('user', newUser);

    await this.userService.createUser(newUser).then((resp) => {
      if (resp) {
        this.setNewUser.emit(true);
        this.closeModal();
      } else {
        Swal.fire(
          'Error',
          'El usuario ingresado ya esta siendo utilizado por alguien mas',
          'error'
        );
      }
    });
  }

  async updateUser(newUser: User) {
    console.log('user', newUser);

    await this.userService.updtUser(newUser).then((resp) => {
      console.log(resp);
      if (resp) {
        this.setNewUser.emit(true);
        this.closeModal();
      } else {
        Swal.fire(
          'Error',
          'Ocurrio un problema actualizando el usuario',
          'error'
        );
      }
    });
  }

  async getDataRolPriviliges() {
    this.assignPermissions = !this.assignPermissions;
    if (this.assignPermissions) {
      await this.userService.getRolPriviliges().then((resp) => {
        console.log(resp);
        this.rolPrivileges = resp;
      });
    }
  }

  async assignUserPrivileges(
    idRolPrivilege: number,
    username: string,
    specialPrivilege: number = 0
  ) {
    await this.userService
      .updtUserPrivilege(idRolPrivilege, username, specialPrivilege)
      .then((resp) => {
        console.log(resp);
        this.rolPrivileges = resp;
      });
  }

  cleanUser(user: User) {
    if (user.username != null)
      user.username = user.username.replace(/[^0-9A-Za-z-._]/g, '');
    if (user.password != null)
      user.password = user.password.replace(/[^0-9A-Za-z-._]/g, '');
  }
}
