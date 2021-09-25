import { PoliceRecordService } from './../../police-record/police.record.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CriminalGroup } from '../../criminals/Interfaces/criminal-interface';
import { CriminalRecordService } from '../criminals.record.service';

@Component({
  selector: 'app-criminal-record-create',
  templateUrl: './criminal-record-create.component.html',
  styleUrls: ['./criminal-record-create.component.css']
})
export class CriminalRecordCreateComponent implements OnInit {

  validForm:boolean =true;
  criminalForm : FormGroup;
  criminalGroups : CriminalGroup[];

  constructor(
              private formBuilder:FormBuilder,
              private criminalService:CriminalRecordService) {
      this.criminalForm = this.formBuilder.group({
        crime: [''],
        sentenceStartDate: [''],
        sentenceFinalDate: [''],
        penitentiaryCenter: [''],
        moduleCellPrison: [''],
        suspectDni: ['',[Validators.required,Validators.pattern('[0-9]+')]],
      })
  }
  // idCriminalRecord: number;
  // crime: string;
  // sentenceStartDate: Date;
  // sentenceFinalDate: Date;
  // penitentiaryCenter: string;
  // moduleCellPrison: string;
  // suspectDni: string;


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
      if (result.sentenceFinalDate== "") {
        delete result.sentenceFinalDate;
      }
      if (result.sentenceStartDate == "") {
        delete result.sentenceStartDate;
      }
      this.criminalService.createRecordCriminal(result).then(resp=>{
     })
    }else{
      this.validForm = false;
    }
  }

}
