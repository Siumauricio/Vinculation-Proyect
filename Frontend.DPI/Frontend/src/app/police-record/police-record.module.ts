import { PoliceRecordDeleteComponent } from './police-record-delete/police-record-delete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PoliceRecordListComponent } from './police-record-list/police-record-list.component';
import { PoliceRecordCreateComponent } from './police-record-create/police-record-create.component';
import { PoliceRecordRoutingModule } from './police-record-routing.module';
import { PoliceRecordFilterPipe } from './pipes/PoliceRecord-filter.pipe';

@NgModule({
  declarations: [
    PoliceRecordListComponent,
    PoliceRecordCreateComponent,
    PoliceRecordDeleteComponent,
    PoliceRecordFilterPipe,
    PoliceRecordCreateComponent,
  ],
  imports: [
    CommonModule,
    PoliceRecordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ]
})
export class PoliceRecordModule { }
