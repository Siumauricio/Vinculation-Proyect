import { SuspectService } from './../suspect.service';
import { UsersService } from './../../users/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Department, Rol, User } from '../../users/interfaces/user';
import { Suspects } from '../interfaces/suspects';

@Component({
  selector: 'app-sospechoso-update',
  templateUrl: './sospechoso-update.component.html',
  styleUrls: ['./sospechoso-update.component.css']
})
export class SospechosoUpdateComponent implements OnInit {
  @ViewChild('updateUserModal', { static: true }) updateUserModal: ModalDirective;
  newSuspect: Suspects = {} as Suspects;
  userFilterSelected: string = '';
  profileForm : FormGroup;
  buttonDisabled: boolean;
  suspectData: Suspects ;

  constructor(private suspectService: SuspectService,private formBuilder:FormBuilder) {
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
  }


  async getSuspectByDni(dniSuspect: string) {
    await this.suspectService.getSuspectByDNI(dniSuspect.trim()).then((resp) => {
      if (resp) {
        console.log(resp)
        this.suspectData = resp;
        this.newSuspect = resp;
        this.profileForm.setValue({
          username: this.newSuspect.dniSuspect,
          password: this.newSuspect.firstName,
          confirmPassword: this.newSuspect.thirdName,
          rolIdRol: this.newSuspect.middleName,
          departmentIdDepartment: this.newSuspect.middleName,
        });
      }
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

   onSubmit() {
    //console.warn(this.profileForm.getRawValue());
    console.log(this.profileForm.getRawValue())
  //  await this.updateSuspect(this.profileForm.getRawValue())
    
  }
  async updateSuspect(newSuspect) {
    // await this.suspectService.updateSuspect(newSuspect).then((resp) => {
    //   console.log(resp);
    // });
  }
  cleanUser(user: User) {
    if (user.username != null)
      user.username = user.username.replace(/[^0-9A-Za-z-._]/g, '');
    if (user.password != null)
      user.password = user.password.replace(/[^0-9A-Za-z-._]/g, '');
  }

}
