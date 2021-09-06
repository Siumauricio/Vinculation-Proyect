import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { UserRolPrivilegesService } from '../../user-rol-privileges.service';
import { RolPrivilege, User } from '../../interfaces/user-rol-privilege';
import { ValueConverter } from '@angular/compiler/src/render3/view/template';
import { UsersService } from 'src/app/users/users.service';
import { AuthenticationService } from 'src/app/authentication.service';

@Component({
  selector: 'app-user-rol-privilege-create',
  templateUrl: './user-rol-privilege-create.component.html',
  styleUrls: ['./user-rol-privilege-create.component.css']
})

export class UserAddRolPrivilegeComponent implements OnInit {

  usersData: User[];
  rolPrivilegesData: RolPrivilege[];
  profileForm : FormGroup;
  buttonDisabled:boolean =false;

  constructor(private userRolPrivilegeService: UserRolPrivilegesService,
              private formBuilder:FormBuilder,
              private userService: UsersService,
              private auth: AuthenticationService) { 
    
      this.profileForm = this.formBuilder.group({
      username: ['',Validators.required],
      idRolPrivileges: ['',Validators.required],
      specialPrivilege: []
    })
    
  }

  async ngOnInit() {
    await this.getUsers();
    await this.getRolPrivileges();
  }

  async getUsers() {
    await this.userRolPrivilegeService.getUsers().then((resp) => {
      this.usersData = resp;
    });
  }

  async getRolPrivileges() {
    await this.userRolPrivilegeService.getRolPrivileges().then((resp) => {
      this.rolPrivilegesData = resp;
    });
  }


  async onSubmit(){
    await this.userRolPrivilegeService.createUserRolPrivilege(this.profileForm.getRawValue()).then(async (resp) => {
      if (resp) {
        await this.userService.loadPrivilegesUser();
      } else {
        Swal.fire(
          'Error',
          'Error privilegio ya existe',
          'error'
        );
      }
    });

  }


keyPressAlphanumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
  }

}
