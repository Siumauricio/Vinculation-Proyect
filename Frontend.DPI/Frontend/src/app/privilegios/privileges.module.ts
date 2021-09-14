import { PrivilegesListComponent } from './privileges-list/privileges-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PrivilegesRoutingModule } from './privileges-routing.module';
import { PrivilegesFilterPipe } from './pipes/privileges-filter.pipe';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    PrivilegesFilterPipe,
    PrivilegesListComponent,
  ],
  imports: [
    CommonModule,
    PrivilegesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
})
export class PrivilegesModule {}
