import { Department, Rol, User } from '../../interfaces/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../users.service';
import { stringify } from 'querystring';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UpdateUserComponent implements OnInit {
  @ViewChild('updateUserModal', { static: true }) updateUserModal: ModalDirective;
  newUser: User = {} as User;
  userFilterSelected: string = 'enriquecs';
  userData: User[];
  rolsData: Rol[];
  departmentsData: Department[];
  profileForm : FormGroup;
  buttonDisabled: boolean;

  constructor(private userService: UsersService,private formBuilder:FormBuilder) {
    this.profileForm = this.formBuilder.group({
      username: new FormControl({value:'',disabled:true}),
      password: new FormControl({value:''},Validators.required),
      confirmPassword: new FormControl({value:''},Validators.required),
      rolIdRol: new FormControl(''),
      departmentIdDepartment: new FormControl(''),
    })
  }

  async ngOnInit() {
    this.buttonDisabled=false;
    await this.getDataRols();
    await this.getDataDepartments();
  }

  async getUserByUsername(username: string) {
    await this.userService.getUserByUsername(username).then((resp) => {
      console.log(resp);
      this.userData = resp;
      this.newUser = resp;
      this.profileForm.setValue({
        username: this.newUser.username,
        password: this.newUser.password,
        confirmPassword: this.newUser.password,
        rolIdRol: this.newUser.rolIdRol,
        departmentIdDepartment: this.newUser.departmentIdDepartment,
      });
    });
  }
  checkPasswords() {
    if (this.profileForm.get('password').value != this.profileForm.get('confirmPassword').value || this.profileForm.get('password').value=='' ){
      this.buttonDisabled=false;
      return 'is-invalid'
    }
    else 
    this.buttonDisabled=true; true
  }

   ShowModal() {
    this.updateUserModal.show();
  }
  closeModal() {
    this.updateUserModal.hide();
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
  async onSubmit() {
    //console.warn(this.profileForm.getRawValue());
   await this.updateUser(this.profileForm.getRawValue())
    
  }
  async updateUser(newUser) {

    await this.userService.updtUser(newUser).then((resp) => {
      console.log(resp);
    });
  }
  cleanUser(user: User) {
    if (user.username != null)
      user.username = user.username.replace(/[^0-9A-Za-z-._]/g, '');
    if (user.password != null)
      user.password = user.password.replace(/[^0-9A-Za-z-._]/g, '');
  }
}