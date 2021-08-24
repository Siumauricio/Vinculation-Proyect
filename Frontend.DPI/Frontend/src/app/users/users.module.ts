import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { CreateUserComponent } from './create-user/create-user.component';
import { FormsModule } from '@angular/forms';
import { CreateUserModalComponent } from './create-user-modal/create-user-modal.component';
import { ModalModule } from 'ngx-bootstrap/modal';
import { UserFilterPipe } from './pipes/user-filter.pipe';



@NgModule({
  declarations: [
    CreateUserComponent,
    CreateUserModalComponent,
    UserFilterPipe,

  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class UsersModule { }
