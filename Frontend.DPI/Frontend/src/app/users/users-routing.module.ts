import { RolDeleteComponent } from './../Roles/rol-delete/rol-delete.component';
import { RolListComponent } from './../Roles/rol-list/rol-list.component';
import { UserDeleteComponent } from './users-crud/user-delete/user-delete.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UpdateUserComponent } from './users-crud/user-update/user-update.component';
import { UserListComponent } from './users-crud/user-list/user-list.component';
import { UserCreateComponent } from './users-crud/user-create/user-create.component';
import { UserAuthenticationGuard } from '../user-authentication.guard';

const routes: Routes = [
  {
    path: 'Modificar Usuario',
    component: UpdateUserComponent,
    data: { title: 'update' },
  },
  {
    path: 'Listar Usuario',
    component: UserListComponent,
    data: { title: 'List' },
  },
  {
    path: 'Agregar Usuario',
    component: UserCreateComponent,
    data: { title: 'List' },
  },  
  {
    path: 'Eliminar Usuario',
    component: UserDeleteComponent,
    data: { title: 'List' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UsersRoutingModule {}
