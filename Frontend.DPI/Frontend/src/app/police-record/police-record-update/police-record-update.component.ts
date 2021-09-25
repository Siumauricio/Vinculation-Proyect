import { PoliceRecord } from './../../criminals/Interfaces/criminal-interface';
import { PoliceRecordService } from './../police.record.service';
import { Component, OnInit, ViewChild } from '@angular/core';

import { ModalDirective } from 'ngx-bootstrap/modal';
import { CriminalRecordService } from '../../criminal-record/criminals.record.service';
import { CriminalRecord } from '../../criminals/Interfaces/criminal-interface';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-police-record-update',
  templateUrl: './police-record-update.component.html',
  styleUrls: ['./police-record-update.component.css']
})
export class PoliceRecordUpdateComponent  {

  
  @ViewChild('updateCriminalModal', { static: true }) updateCriminalModal: ModalDirective;
  policeRecordData: CriminalRecord[];
  dniCriminal: string ='';
  criminalForm : FormGroup;
  newSuspect: PoliceRecord = {} as PoliceRecord;
  newCriminal :PoliceRecord;
  saveDNI :string;
  testCriminal:PoliceRecord

  validForm:boolean=true;
  constructor(
    private policeService:PoliceRecordService,
    private formBuilder:FormBuilder
  ) {
    this.criminalForm = this.formBuilder.group({
      colonia: [''],
      confiscationDescription: [''],
      confiscationQuantity: [''],
      confiscationType: [''],
      detentionDepartment: ['',[Validators.required]],
      detentionMunicipio: ['',[Validators.required]],
      reasonDetention: ['',[Validators.required]],
      capturedByOrganization: ['',[Validators.required]],
      caserio: [''],
      village: [''],
      suspectDni: ['',[Validators.required,Validators.pattern('[0-9]+')]],
    })

  }



  onChange(newValue) {
    this.newSuspect.detentionDate=newValue;
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

  async getPoliceRecordByDNI(dni:string){
    this.saveDNI = dni;
   await  this.policeService.getPoliceRecordByDNI(dni).then(resp=>{
      this.policeRecordData = resp;
    })
  }


  async ShowModal(police:PoliceRecord){
     this.newSuspect = police;
     this.testCriminal = police
    this.criminalForm = this.formBuilder.group({
      colonia: [police.colonia],
      confiscationDescription: [police.confiscationDescription],
      confiscationQuantity: [police.confiscationQuantity],
      confiscationType: [police.confiscationType],
      detentionDepartment: [police.detentionDepartment,[Validators.required]],
      detentionMunicipio: [police.detentionMunicipio,[Validators.required]],
      reasonDetention: [police.reasonDetention,[Validators.required]],
      capturedByOrganization: [police.capturedByOrganization,[Validators.required]],
      caserio: [police.caserio],
      village: [police.village],
      suspectDni: [police.suspectDni,[Validators.required,Validators.pattern('[0-9]+')]],
    })
    this.updateCriminalModal.show();
     await this.getPoliceRecordByDNI(this.saveDNI);
  }


  async onSubmit(){
    if(this.criminalForm.valid && this.newSuspect.detentionDate?.toString() != ""){
      this.validForm = true;
      let result:PoliceRecord = this.criminalForm.getRawValue();
      result.idPoliceRecord = this.newSuspect.idPoliceRecord;
      result.detentionDate = this.newSuspect.detentionDate;
      this.validForm = true;
      await this.policeService.updatePoliceRecord(result).then(async resp=>{
        if(resp){
           this.updateCriminalModal.hide();
           this.newSuspect = result;
           await this.getPoliceRecordByDNI(this.saveDNI);
        }
      })

    }else{
      this.newSuspect = this.testCriminal;
      this.validForm = false;
    }
  }
}
