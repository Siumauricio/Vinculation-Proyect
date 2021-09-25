import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CriminalsService } from '../../criminals/criminals.service';
import { Criminal, CriminalGroup, CriminalRecord } from '../../criminals/Interfaces/criminal-interface';
import { CriminalRecordService } from '../criminals.record.service';

@Component({
  selector: 'app-criminal-record-update',
  templateUrl: './criminal-record-update.component.html',
  styleUrls: ['./criminal-record-update.component.css']
})
export class CriminalRecordUpdateComponent implements OnInit {

  @ViewChild('updateCriminalModal', { static: true }) updateCriminalModal: ModalDirective;
  criminalData: CriminalRecord[];
  dniCriminal: string;
  criminalForm : FormGroup;
  newSuspect: CriminalRecord = {} as CriminalRecord;
  newCriminal :CriminalRecord;
  saveDNI :string;
  testCriminal:CriminalRecord
  validForm:boolean=true;
  constructor(
    private criminalService:CriminalRecordService,
    private formBuilder:FormBuilder
  ) {
    this.criminalForm = this.formBuilder.group({
      idCriminalRecord:[''],
      crime: [''],
      sentenceStartDate: [''],
      sentenceFinalDate: [''],
      penitentiaryCenter: [''],
      moduleCellPrison: [''],
      suspectDni: ['',[Validators.required,Validators.pattern('[0-9]+')]],
    })

  }

  async ngOnInit() {

  }

  onChange(newValue) {
    this.newSuspect.sentenceStartDate=newValue;

}
onChange2(newValue) {
  this.newSuspect.sentenceFinalDate=newValue;
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

  async getCriminalRecordByDNI(dni:string){
    this.saveDNI = dni;
   await  this.criminalService.getCriminalByDNI(dni).then(resp=>{
      this.criminalData = resp;
    })
  }


  async ShowModal(criminal:CriminalRecord){
    this.newSuspect = criminal;
    this.testCriminal = criminal
    this.criminalForm = this.formBuilder.group({
      idCriminalRecord:[criminal.idCriminalRecord],
      crime: [criminal.crime],
      sentenceStartDate: [criminal.sentenceStartDate],
      sentenceFinalDate: [criminal.sentenceFinalDate],
      penitentiaryCenter: [criminal.penitentiaryCenter],
      moduleCellPrison: [criminal.moduleCellPrison],
      suspectDni: [criminal.suspectDni,[Validators.required,Validators.pattern('[0-9]+')]],
    })
    this.updateCriminalModal.show();
    await this.getCriminalRecordByDNI(this.saveDNI);
  }


  async onSubmit(){
    if(this.criminalForm.valid){
      this.validForm = true;

      let result:CriminalRecord = this.criminalForm.getRawValue();
      result.sentenceFinalDate = this.newSuspect.sentenceFinalDate;
      result.sentenceStartDate = this.newSuspect.sentenceStartDate;
      this.validForm = true;
      if (result.sentenceFinalDate?.toString()== "") {
        delete result.sentenceFinalDate;
      }
      if (result.sentenceStartDate?.toString() == "") {
        delete result.sentenceStartDate;
      }
      await this.criminalService.updtCriminalRecord(result).then(async resp=>{
        if(resp){
           this.updateCriminalModal.hide();
           this.newSuspect = result;
           await this.getCriminalRecordByDNI(this.saveDNI);
        }
      })

    }else{
      this.newSuspect = this.testCriminal;
      this.validForm = false;
    }
  }
}
