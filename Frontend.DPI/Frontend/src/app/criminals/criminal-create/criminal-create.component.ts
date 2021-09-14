import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, PatternValidator, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/authentication.service';
import { CriminalsService } from '../criminals.service';
import { CriminalGroup } from '../Interfaces/criminal-interface';

@Component({
  selector: 'app-criminal-create',
  templateUrl: './criminal-create.component.html',
  styleUrls: ['./criminal-create.component.css']
})
export class CriminalCreateComponent implements OnInit {

  validForm:boolean =true;
  criminalForm : FormGroup;
  criminalGroups : CriminalGroup[];

  constructor(
              private formBuilder:FormBuilder,
              private criminalService:CriminalsService) {
      this.criminalForm = this.formBuilder.group({
        incidenceType: [''],
        incidenceZone: [''],
        hierarchyCriminalGroup: [''],
        periodBelong: ['',Validators.required],
        operationPlace: ['',Validators.required],
        tatooType: [''],
        suspectDni: ['',[Validators.required,Validators.pattern('[0-9]+')]],
        criminalGroupIdCg: ['',Validators.required],
      })
  }



  async ngOnInit(){
    await this.getCriminalGroups();
  }


  get suspectDni() {
    return this.criminalForm.get('suspectDni');
  }

  async getCriminalGroups(){
    await this.criminalService.getCriminalGroups().then(resp=>{
      if(resp){
        this.criminalGroups = resp;
      }

    })
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

  onSubmit(){
    if(this.criminalForm.valid){
      this.validForm = true;
      this.criminalService.createCriminal(this.criminalForm.getRawValue()).then(resp=>{
        console.log(resp);
      })
    }else{
      this.validForm = false;
    }
  }
}
