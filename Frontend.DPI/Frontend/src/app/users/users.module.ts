import { UpdateUserComponent } from './users-crud/user-update/user-update.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserFilterPipe } from './pipes/user-filter.pipe';
import { UserListComponent } from './users-crud/user-list/user-list.component';
import { UserCreateComponent } from './users-crud/user-create/user-create.component';
import { UserDeleteComponent } from './users-crud/user-delete/user-delete.component';

@NgModule({
  declarations: [
    UserFilterPipe,
    UserListComponent,
    UpdateUserComponent,
    UserCreateComponent,
    UserDeleteComponent,
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule,
  ],
})
export class UsersModule {}
