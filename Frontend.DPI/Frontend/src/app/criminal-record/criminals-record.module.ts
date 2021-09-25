import { CriminalRecordListComponent } from './criminal-record-list/criminal-record-list.component';
import { CriminalRecordUpdateComponent } from './criminal-record-update/criminal-record-update.component';
import { CriminalRecordDeleteComponent } from './criminal-record-delete/criminal-record-delete.component';
import { CriminalRecordCreateComponent } from './criminal-record-create/criminal-record-create.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';


import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CriminalRecordFilterPipe } from './pipes/CriminalRecord-filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CriminalsRecordRoutingModule } from './criminals-record-routing.module';

@NgModule({
  declarations: [
    CriminalRecordCreateComponent,
    CriminalRecordDeleteComponent,
    CriminalRecordUpdateComponent,
    CriminalRecordFilterPipe,
    CriminalRecordListComponent,
  ],
  imports: [
    CommonModule,
    CriminalsRecordRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ]
})
export class CriminalRecordModule { }
