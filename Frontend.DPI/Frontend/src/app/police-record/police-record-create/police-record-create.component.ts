import { PoliceRecordService } from './../police.record.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PoliceRecord } from '../../criminals/Interfaces/criminal-interface';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-police-record-create',
  templateUrl: './police-record-create.component.html',
  styleUrls: ['./police-record-create.component.css']
})
export class PoliceRecordCreateComponent implements OnInit {

  validForm:boolean =true;
  criminalForm : FormGroup;
  criminalGroups : PoliceRecord[];

  constructor(
              private formBuilder:FormBuilder,
              private police:PoliceRecordService) {
      this.criminalForm = this.formBuilder.group({
        colonia: [''],
        confiscationDescription: [''],
        confiscationQuantity: [''],
        confiscationType: [''],
        detentionDate: ['',[Validators.required]],
        detentionDepartment: ['',[Validators.required]],
        detentionMunicipio: ['',[Validators.required]],
        reasonDetention: ['',[Validators.required]],
        capturedByOrganization: ['',[Validators.required]],
        caserio: [''],
        village: [''],
        suspectDni: ['',[Validators.required,Validators.pattern('[0-9]+')]],
      })
  }


  async ngOnInit(){
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

  onSubmit(){
    if(this.criminalForm.valid){
      let result = this.criminalForm.getRawValue();
      this.validForm = true;
      if (result.detentionDate== "") {
        delete result.detentionDate;
      }
    
      this.police.createPoliceRecord(result).then(resp=>{
        if (resp == true) {
       this.criminalForm.reset();
        }else{
          this.errorMessage('No existe el DNI');
        }
     })
    }else{
      this.validForm = false;
    }
  }
  
  errorMessage(message) {
    Swal.fire({
      title: 'Error',
      text: message,
      icon: 'error',
    });
  }

}
