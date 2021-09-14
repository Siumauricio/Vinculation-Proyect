import {DepartamentoCreateComponent } from './departamento-create/departamento-create.component';
import { DepartamentoDeleteComponent } from './departamento-delete/departamento-delete.component';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { DepartamentRoutingModule } from './department-routing.module';
import { DepartmentFilterPipe } from './pipes/department-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    DepartmentFilterPipe,
    DepartamentoListComponent,
    DepartamentoDeleteComponent,
    DepartamentoCreateComponent,
  ],
  imports: [
    CommonModule,
    DepartamentRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
})
export class DepartmentModule {}
