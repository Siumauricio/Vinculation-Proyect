import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriminalsRoutingModule } from './criminals-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { CriminalFilterPipe } from './pipes/user-filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { HistorialCriminalCreateComponent } from './criminal-create/criminal-create.component';
import { HistorialCriminalUpdateComponent } from './criminal-update/criminal-update.component';
import { HistorialCriminalListComponent } from './criminal-list/criminal-list.component';
import { HistorialCriminalDeleteComponent } from './criminal-delete/criminal-delete.component';


@NgModule({
  declarations: [
    HistorialCriminalCreateComponent,
    HistorialCriminalUpdateComponent,
    HistorialCriminalListComponent,
    CriminalFilterPipe,
    HistorialCriminalDeleteComponent
  ],
  imports: [
    CommonModule,
    CriminalsRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    NgxPaginationModule,
    ModalModule.forRoot(),
  ]
})
export class CriminalsModule { }
