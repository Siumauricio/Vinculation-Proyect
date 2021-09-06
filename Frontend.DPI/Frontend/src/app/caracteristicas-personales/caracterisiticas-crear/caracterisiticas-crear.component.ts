import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-caracterisiticas-crear',
  templateUrl: './caracterisiticas-crear.component.html',
  styleUrls: ['./caracterisiticas-crear.component.css']
})
export class CaracterisiticasCrearComponent implements OnInit {

  CaracteristicaForm : FormGroup;

  constructor(private formBuilder:FormBuilder) {
    this.CaracteristicaForm = this.formBuilder.group({
      departmentName: ['',Validators.required],
    })
  }

  ngOnInit(): void {
  }

  onSubmit(){

  }

}
