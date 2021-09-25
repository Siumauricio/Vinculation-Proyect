import { PoliceRecordDeleteComponent } from './police-record-delete/police-record-delete.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { NgxPaginationModule } from 'ngx-pagination';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PoliceRecordListComponent } from './police-record-list/police-record-list.component';
import { PoliceRecordCreateComponent } from './police-record-create/police-record-create.component';
import { PoliceRecordRoutingModule } from './police-record-routing.module';
import { PoliceRecordFilterPipe } from './pipes/PoliceRecord-filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PoliceRecordUpdateComponent } from './police-record-update/police-record-update.component';

@NgModule({
  declarations: [
    PoliceRecordListComponent,
    PoliceRecordCreateComponent,
    PoliceRecordDeleteComponent,
    PoliceRecordFilterPipe,
    PoliceRecordUpdateComponent,
  ],
  imports: [
    CommonModule,
    PoliceRecordRoutingModule,
    FormsModule,

    ReactiveFormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ]
})
export class PoliceRecordModule { }
