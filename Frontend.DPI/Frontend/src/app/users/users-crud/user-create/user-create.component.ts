import { UsersService } from './../../users.service';
import { Component, OnInit } from '@angular/core';
import { Department, Rol } from '../../interfaces/user';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  rolsData: Rol[];
  departmentsData: Department[];
  profileForm : FormGroup;
  buttonDisabled:boolean =false;
  constructor(private userService: UsersService,private formBuilder:FormBuilder) { 
      this.profileForm = this.formBuilder.group({
      username: ['',Validators.required],
      password: ['',Validators.required],
      confirmPassword: ['',Validators.required],
      rolIdRol: ['',Validators.required],
      departmentIdDepartment: ['',Validators.required],
    })
    
  }
  async ngOnInit() {
    await this.getDataRols();
    await this.getDataDepartments();
  }

  async getDataRols() {
    await this.userService.getRols().then((resp) => {
      this.rolsData = resp;
    });
  }

  async getDataDepartments() {
    await this.userService.getDepartments().then((resp) => {
      this.departmentsData = resp;
    });
  }

  checkPasswords() {
    if ((this.profileForm.get('password').value != this.profileForm.get('confirmPassword').value) && (this.profileForm.get('password').value!='' && this.profileForm.get('confirmPassword').value!='' )){
      this.buttonDisabled=false;
      return 'is-invalid'
    }
    else 
    this.buttonDisabled=true; true
  }

  onSubmit(){
     this.userService.createUser(this.profileForm.getRawValue()).then((resp) => {
      if (resp) {
        this.profileForm.setValue({
          username:'',
          password:'',
          confirmPassword:'',
          rolIdRol:'',
          departmentIdDepartment:''

        });
      } else {
        Swal.fire(
          'Error',
          'Este usuario ya existe',
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
