import { Department, Rol, User } from '../../interfaces/user';
import { Component, OnInit, ViewChild } from '@angular/core';
import { UsersService } from '../../users.service';
import { stringify } from 'querystring';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';
@Component({
  selector: 'app-user-update',
  templateUrl: './user-update.component.html',
  styleUrls: ['./user-update.component.css'],
})
export class UpdateUserComponent implements OnInit {
  @ViewChild('updateUserModal', { static: true }) updateUserModal: ModalDirective;
  newUser: User = {} as User;
  userFilterSelected: string = '';
  userData: User[];
  rolsData: Rol[];
  departmentsData: Department[];
  profileForm : FormGroup;
  buttonDisabled: boolean;

  constructor(private userService: UsersService,private formBuilder:FormBuilder) {
    this.profileForm = this.formBuilder.group({
      username: new FormControl({value:'',disabled:true}),
      password: new FormControl(''),
      confirmPassword: new FormControl(''),
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
      this.userData = resp;
      this.newUser = resp;
      console.log(this.newUser.password);
      this.profileForm.setValue({
        username: this.newUser.username,
        password: '',
        confirmPassword: '',
        rolIdRol: this.newUser.rolIdRol,
        departmentIdDepartment: this.newUser.departmentIdDepartment,
      });
    });
  }
  checkPasswords() {
    if (!this.profileForm.controls.password.dirty) {
        return;
    }
    if (this.profileForm.get('password').value == '' && this.profileForm.get('confirmPassword').value =='') {
      this.profileForm.setErrors(null);
        return ''
    }
    if (this.profileForm.get('password').value != this.profileForm.get('confirmPassword').value || this.profileForm.get('password').value == '' ) {
      this.buttonDisabled=false;
      this.profileForm.setErrors({required:true}) 
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
    if (newUser.password == null || newUser.password == '') {
      console.log('no hay')
      delete newUser.password;
      delete newUser.confirmPassword;
    }
    await this.userService.updtUser(newUser).then((resp) => {
      this.closeModal();
    });
  }

  isValid(){
    return !this.profileForm.dirty || this.profileForm.invalid ; 
  }

  cleanUser(user: User) {
    if (user.username != null)
      user.username = user.username.replace(/[^0-9A-Za-z-._]/g, '');
    if (user.password != null)
      user.password = user.password.replace(/[^0-9A-Za-z-._]/g, '');
  }

  keyPressAlphanumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }
}


}
