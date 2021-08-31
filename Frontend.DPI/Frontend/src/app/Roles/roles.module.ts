import { RolCreateComponent } from './rol-create/rol-create.component';
import { RolDeleteComponent } from './rol-delete/rol-delete.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolesRoutingModule } from './roles-routing.module';
import { RolesFilterPipe } from './pipes/roles-filter.pipe';

@NgModule({
  declarations: [
    RolesFilterPipe,
    RolListComponent,
    RolDeleteComponent,
    RolCreateComponent,
  ],
  imports: [
    CommonModule,
    RolesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class RolesModule {}
