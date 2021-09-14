import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CriminalsRoutingModule } from './criminals-routing.module';
import { CriminalCreateComponent } from './criminal-create/criminal-create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CriminalUpdateComponent } from './criminal-update/criminal-update.component';
import { CriminalListComponent } from './criminal-list/criminal-list.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { CriminalFilterPipe } from './pipes/user-filter.pipe';
import { ModalModule } from 'ngx-bootstrap/modal';
import { CriminalDeleteComponent } from './criminal-delete/criminal-delete.component';


@NgModule({
  declarations: [
    CriminalCreateComponent,
    CriminalUpdateComponent,
    CriminalListComponent,
    CriminalFilterPipe,
    CriminalDeleteComponent
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
