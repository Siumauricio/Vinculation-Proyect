import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UsersCrudComponent } from './users-crud/users-crud.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CreateUpdateUserModalComponent } from './create-update-user-modal/create-update-user-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserFilterPipe } from './pipes/user-filter.pipe';



@NgModule({
  declarations: [
    UsersCrudComponent,
    CreateUpdateUserModalComponent,
    UserFilterPipe,


  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    ReactiveFormsModule
  ]
})
export class UsersModule { }
