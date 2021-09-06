import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CaracteristicasPersonalesRoutingModule } from './caracteristicas-personales-routing.module';
import { CaracteristicasPersonalesSospechososComponent } from './caracteristicas-personales-sospechosos/caracteristicas-personales-sospechosos.component';
import { CaracterisiticasCrearComponent } from './caracterisiticas-crear/caracterisiticas-crear.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    CaracteristicasPersonalesSospechososComponent,
    CaracterisiticasCrearComponent
  ],
  imports: [
    CommonModule,
    CaracteristicasPersonalesRoutingModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class CaracteristicasPersonalesModule { }
