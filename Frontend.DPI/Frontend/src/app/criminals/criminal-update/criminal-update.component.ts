import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { CriminalsService } from '../criminals.service';
import { Criminal, CriminalGroup } from '../Interfaces/criminal-interface';

@Component({
  selector: 'app-criminal-update',
  templateUrl: './criminal-update.component.html',
  styleUrls: ['./criminal-update.component.css']
})
export class  HistorialCriminalUpdateComponent implements OnInit {
  @ViewChild('updateCriminalModal', { static: true }) updateCriminalModal: ModalDirective;
  criminalData: Criminal[];
  dniCriminal: string;
  criminalForm : FormGroup;
  criminalGroups : CriminalGroup[];

  validForm:boolean=true;
  constructor(
    private criminalService:CriminalsService,
    private formBuilder:FormBuilder
  ) {
    this.criminalForm = this.formBuilder.group({
      idCriminalData: [''],
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

  async ngOnInit() {

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

  async getCriminalDataByDNI(dni:string){
   await  this.criminalService.getCriminalByDNI(dni).then(resp=>{
      this.criminalData = resp;
    })
  }


  async ShowModal(criminal:Criminal){

    await this.getCriminalGroups();

    this.criminalForm = this.formBuilder.group({
      idCriminalData: [criminal.idCriminalData],
      incidenceType: [criminal.incidenceType],
      incidenceZone: [criminal.incidenceZone],
      hierarchyCriminalGroup: [criminal.hierarchyCriminalGroup],
      periodBelong: [Number(criminal.periodBelong.split(' ')[0]),Validators.required],
      operationPlace: [criminal.operationPlace,Validators.required],
      tatooType: [criminal.tatooType],
      suspectDni: [criminal.suspectDni,[Validators.required,Validators.pattern('[0-9]+')]],
      criminalGroupIdCg: [criminal.criminalGroupIdCg,Validators.required],
    })

    this.updateCriminalModal.show();

  }

  async getCriminalGroups(){
    await this.criminalService.getCriminalGroups().then(resp=>{
      if(resp){
        this.criminalGroups = resp;
      }
    })
  }

  async onSubmit(){
    if(this.criminalForm.valid){
      this.validForm = true;
      await this.criminalService.updtCriminalData(this.criminalForm.getRawValue()).then(async resp=>{
        if(resp){
          this.updateCriminalModal.hide();
          await this.getCriminalDataByDNI(this.dniCriminal);
        }
      })

    }else{
      this.validForm = false;
    }
  }
}
