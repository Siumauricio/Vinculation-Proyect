import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAddRolPrivilegeComponent } from './user-rol-privilege-crud/user-rol-privilege-create/user-rol-privilege-create.component';
import { UserRolPrivilegeDeleteComponent } from './user-rol-privilege-crud/user-rol-privilege-delete/user-rol-privilege-delete.component';
import { UserRolPrivilegeListComponent } from './user-rol-privilege-crud/user-rol-privilege-list/user-rol-privileges-list.component';

const routes: Routes = [
  {
    path: 'Listar Privilegios Usuarios',
    component: UserRolPrivilegeListComponent,
    data: { title: 'List' },
  },
  
  {
    path: 'Agregar Privilegios Usuarios',
    component: UserAddRolPrivilegeComponent,
    data: { title: 'Add' },
  },
  
  {
    path: 'Eliminar Privilegios Usuarios',
    component: UserRolPrivilegeDeleteComponent,
    data: { title: 'List' },
  }
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRolPrivilegesRoutingModule {}
