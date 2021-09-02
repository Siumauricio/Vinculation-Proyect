import { Component, OnInit } from '@angular/core';
import { Privilege,Rol } from '../../interfaces/rol-privilege';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { RolPrivilegeService } from '../../rol_privilege.service';
import { UsersService } from 'src/app/users/users.service';

@Component({
  selector: 'app-rol-privilege-create',
  templateUrl: './rol-privilege-create.component.html',
  styleUrls: ['./rol-privilege-create.component.css']
})
export class RolPrivilegeCreateComponent implements OnInit {

  rolsData: Rol[];
  privilegesData: Privilege[];
  profileForm : FormGroup;
  buttonDisabled:boolean =false;
  constructor(private userService: UsersService,
              private rolPrivilegeService: RolPrivilegeService,
              private formBuilder:FormBuilder) { 
      this.profileForm = this.formBuilder.group({
      rolIdRol: ['',Validators.required],
      privilegeIdPrivilege: ['',Validators.required],
    })
    
  }
  async ngOnInit() {
    await this.getDataRols();
    await this.getDataPrivileges();
  }

  async getDataRols() {
    await this.userService.getRols().then((resp) => {
      this.rolsData = resp;
    });
  }

  async getDataPrivileges() {
    await this.rolPrivilegeService.getPrivileges().then((resp) => {
      this.privilegesData = resp;
    });
  }


  onSubmit(){
    this.rolPrivilegeService.createRolPrivilege(this.profileForm.getRawValue()).then((resp) => {
      if (resp) {
      } else {
        Swal.fire(
          'Error',
          'Datos ya existen',
          'error'
        );
      }
    });
  }

}
