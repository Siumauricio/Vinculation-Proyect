import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Department, Rol } from '../../users/interfaces/user';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-sospechoso-create',
  templateUrl: './sospechoso-create.component.html',
  styleUrls: ['./sospechoso-create.component.css']
})
export class SospechosoCreateComponent implements OnInit {

  suspectForm : FormGroup;
  buttonDisabled:boolean =false;

  constructor(private userService: UsersService,private formBuilder:FormBuilder) { 
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
      houseNumber: [''],
      pasaje: [''],
      referenceAddress: [''],
      department: ['',Validators.required],
      municipio: ['',Validators.required],
      recordStatus: [''],
      usernameRegistryData: ['',Validators.required],
      departmentIdDepartment: ['',Validators.required],
    })
    
  }
  async ngOnInit() {
   
  }

  onSubmit(){
     console.log( this.suspectForm.getRawValue());
    //  this.userService.createUser(this.suspectForm.getRawValue()).then((resp) => {
    //   if (resp) {
    //     this.suspectForm.reset();
    //   } else {
    //     Swal.fire(
    //       'Error',
    //       'Este usuario ya existe',
    //       'error'
    //     );
    //   }
    // });
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
