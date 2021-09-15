import { Departamentos, Nacionalidades, Suspects, EstadoCivil, Municipios } from './../interfaces/suspects';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Department, Rol } from '../../users/interfaces/user';
import { UsersService } from '../../users/users.service';
import { AuthenticationService } from '../../authentication.service';
import { SuspectService } from '../suspect.service';

@Component({
  selector: 'app-sospechoso-create',
  templateUrl: './sospechoso-create.component.html',
  styleUrls: ['./sospechoso-create.component.css']
})
export class SospechosoCreateComponent  {

  suspectForm : FormGroup;
  buttonDisabled:boolean =false;
  suspect:Suspects;
  Nacionalidades = Nacionalidades;
  Departamentos = Departamentos;
  EstadoCivil = EstadoCivil;
  Municipios = Municipios;
  MunicipiosLst:any;
  constructor(private auth: AuthenticationService,private suspectService:SuspectService,private formBuilder:FormBuilder) { 
      this.suspectForm = this.formBuilder.group({
      dniSuspect: ['',Validators.required],
      firstName: ['',Validators.required],
      middleName:[''],
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
  //  console.log(Municipios.length);

  }


  onSubmit(){
    this.suspect = this.suspectForm.getRawValue();
    this.suspect.usernameRegistryData = this.auth.currentUser.username;
    this.suspect.departmentIdDepartment = this.auth.currentUser.departmentIdDepartment;
    console.log(this.suspect)
    console.log(this.suspectForm.getRawValue())
     this.suspectService.addSuspect(this.suspect).then((resp) => {
      if (resp == true) {
        this.suspectForm.reset();
      } else {
        Swal.fire(
          'Error',
          'Error al ingresar sospechoso',
          'error'
        );
      }
    });
  }

  getDepartment(){
 this.MunicipiosLst=Municipios[this.suspectForm.controls.department.value];
}

keyPressAlphanumeric(event) {
    var inp = String.fromCharCode(event.keyCode);
    if (/[a-zA-Z0-9\u00F1A_ ]/.test(inp)) {
      return true;
    } else {
      event.preventDefault();
      return false;
    }

  }

}
