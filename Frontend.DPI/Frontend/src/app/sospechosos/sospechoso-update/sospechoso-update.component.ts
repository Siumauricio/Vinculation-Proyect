import { SuspectService } from './../suspect.service';
import { UsersService } from './../../users/users.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { stringify } from 'querystring';
import { InvokeFunctionExpr } from '@angular/compiler';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { FormControl, FormGroup, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Department, Rol, User } from '../../users/interfaces/user';
import { Suspects } from '../interfaces/suspects';
import { AuthenticationService } from '../../authentication.service';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-sospechoso-update',
  templateUrl: './sospechoso-update.component.html',
  styleUrls: ['./sospechoso-update.component.css']
})
export class SospechosoUpdateComponent implements OnInit {
  @ViewChild('updateUserModal', { static: true }) updateUserModal: ModalDirective;
  newSuspect: Suspects = {} as Suspects;
  userFilterSelected: string = '0501';
  suspectForm : FormGroup;
  buttonDisabled: boolean;
  suspectData: Suspects ;
  isDirty:boolean=false;
data:any
  constructor(private suspectService: SuspectService,private formBuilder:FormBuilder,private auth: AuthenticationService,public datepipe: DatePipe) {
    this.suspectForm = this.formBuilder.group({
      dniSuspect: ['',Validators.required],
      firstName: ['',Validators.required],
      middleName:'',
      thirdName: ['',Validators.required],
      lastName: ['',Validators.required],
      alias: [''],
      sex: ['',Validators.required],
      height: ['',Validators.required],
      weight: ['',Validators.required],
      eyesColor: ['',Validators.required],
      build: ['',Validators.required],
      personFrom: ['',Validators.required],
      ocupattion: ['',Validators.required],
      passportNumber: [''],
      particularSign: ['',Validators.required],
      tattoo: [''],
      operationPlace: [''],
      dateOfBirth: ['',Validators.required],
      nationaliy: ['',Validators.required],
      age: ['',Validators.required],
      civilStatus: ['',Validators.required],
      colonia: [''],
      street: [''],
      avenue: [''],
      village:[''],
      caserio: [''],
      houseNumber: ['0'],
      pasaje: [''],
      referenceAddress: [''],
      department: ['',Validators.required],
      municipio: ['',Validators.required],
      recordStatus: [''],
      usernameRegistryData: [''],
      departmentIdDepartment: [''],
    })
  }
  async ngOnInit() {
    this.buttonDisabled=false;
  }

  onChange(newValue) {
    this.suspectForm.controls.dateOfBirth.setValue(newValue);
    this.suspectForm.controls['dateOfBirth'].markAsDirty();
}
  async getSuspectByDni(dniSuspect: string) {
    await this.suspectService.getSuspectByDNI(dniSuspect.trim()).then((resp) => {
      if (resp) {
        this.suspectData = resp;
        this.newSuspect = resp;
       
      }
    });
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
  isValid(){
    return !this.suspectForm.dirty || this.suspectForm.invalid ; 
  }


   ShowModal() {
    this.suspectForm.setValue({
      dniSuspect: this.newSuspect.dniSuspect,
      firstName: this.newSuspect.firstName,
      middleName: this.newSuspect.middleName,
      thirdName: this.newSuspect.thirdName,
      lastName: this.newSuspect.lastName,
      alias : this.newSuspect.alias,
      sex: this.newSuspect.sex,
      height: this.newSuspect.height,
      weight: this.newSuspect.weight,
      eyesColor: this.newSuspect.eyesColor,
      build: this.newSuspect.build,
      personFrom: this.newSuspect.personFrom,
      ocupattion: this.newSuspect.ocupattion,
      passportNumber: this.newSuspect.passportNumber,
      particularSign: this.newSuspect.particularSign,
      tattoo: this.newSuspect.tattoo,
      operationPlace: this.newSuspect.operationPlace,
      dateOfBirth: this.newSuspect.dateOfBirth,
      nationaliy:this.newSuspect.nationaliy,
      age: this.newSuspect.age,
      civilStatus: this.newSuspect.civilStatus,
      colonia: this.newSuspect.colonia,
      street: this.newSuspect.street,
      avenue: this.newSuspect.avenue,
      village:this.newSuspect.village,
      caserio: this.newSuspect.caserio,
      houseNumber: this.newSuspect.houseNumber,
      pasaje: this.newSuspect.pasaje,
      referenceAddress: this.newSuspect.referenceAddress,
      department: this.newSuspect.department,
      municipio: this.newSuspect.municipio,
      recordStatus: this.newSuspect.recordStatus,
      usernameRegistryData: this.newSuspect.usernameRegistryData,
      departmentIdDepartment: this.newSuspect.departmentIdDepartment,
    });
    this.updateUserModal.show();
  }
  closeModal() {
    this.updateUserModal.hide();
  }

  async onSubmit() {
    let Suspect :Suspects = this.suspectForm.getRawValue();
    Suspect.lastModificationUser = this.auth.currentUser.username;
    await this.updateSuspect(this.suspectData.dniSuspect,Suspect);
  }

  async updateSuspect(dni,Suspect) {
    await this.suspectService.updateSuspect(dni,Suspect).then((resp) => {
      if (resp) {
        this.newSuspect = Suspect;
        this.suspectData =Suspect;
        this.suspectForm.reset();
      }
    });  
    setTimeout(()=>{
      this.closeModal();
    },1200); 


  }
  cleanUser(user: User) {
    if (user.username != null)
      user.username = user.username.replace(/[^0-9A-Za-z-._]/g, '');
    if (user.password != null)
      user.password = user.password.replace(/[^0-9A-Za-z-._]/g, '');
  }

}

