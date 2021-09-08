import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserRolPrivilegesRoutingModule } from './user-rol-privileges-routing.module';
import { UserRolPrivilegeFilterPipe } from './pipes/user-rol-privilege-filter.pipe';
import { UserRolPrivilegeListComponent } from './user-rol-privilege-crud/user-rol-privilege-list/user-rol-privileges-list.component';
import { UserAddRolPrivilegeComponent } from './user-rol-privilege-crud/user-rol-privilege-create/user-rol-privilege-create.component';
import { UserRolPrivilegeDeleteComponent } from './user-rol-privilege-crud/user-rol-privilege-delete/user-rol-privilege-delete.component';


@NgModule({
  declarations: [
    UserRolPrivilegeFilterPipe,
    UserRolPrivilegeListComponent,
    UserAddRolPrivilegeComponent,
    UserRolPrivilegeDeleteComponent

  ],
  imports: [
    CommonModule,
    UserRolPrivilegesRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
    NgxPaginationModule
  ],
})
export class UserRolPrivilegesModule {}
