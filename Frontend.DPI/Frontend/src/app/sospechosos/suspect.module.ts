import { SuspectFilterPipe } from './pipes/suspect-filter.pipe';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { SuspectListComponent } from './sospechoso-list/suspect-list.component';
import { SuspectRoutingModule } from './suspect-routing.module';
import { SospechosoCreateComponent } from './sospechoso-create/sospechoso-create.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { SospechosoListPerDayComponent } from './sospechoso-list-per-day/sospechoso-list-per-day.component';

@NgModule({
  declarations: [
    SuspectFilterPipe,
    SuspectListComponent,
    SospechosoCreateComponent,
    SospechosoListPerDayComponent,
  ],
  imports: [
    CommonModule,
    SuspectRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule,

  ],
})
export class SuspectModule {}
