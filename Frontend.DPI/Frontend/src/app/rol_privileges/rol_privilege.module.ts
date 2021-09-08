import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolPrivilegeRoutingModule } from './rol_privilege-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { RolPrivilegeFilterPipe } from './pipes/rol-privilege-filter.pipe';
import { RolPrivilegeListComponent } from './rol_privileges_crud/rol_privilege-list/rol-privilege-list.component';
import { RolPrivilegeCreateComponent } from './rol_privileges_crud/rol_privilege-create/rol-privilege-create.component';
import { RolPrivilegeDeleteComponent } from './rol_privileges_crud/rol-privilege-delete/rol-privilege-delete.component';

@NgModule({
  declarations: [
    RolPrivilegeFilterPipe,
    RolPrivilegeListComponent,
    RolPrivilegeCreateComponent,
    RolPrivilegeDeleteComponent
  ],
  imports: [
    CommonModule,
    RolPrivilegeRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
})
export class RolPrivilegesModule {}
