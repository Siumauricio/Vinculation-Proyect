import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RolPrivilegeDeleteComponent } from './rol_privileges_crud/rol-privilege-delete/rol-privilege-delete.component';
import { RolPrivilegeCreateComponent } from './rol_privileges_crud/rol_privilege-create/rol-privilege-create.component';
import { RolPrivilegeListComponent } from './rol_privileges_crud/rol_privilege-list/rol-privilege-list.component';

const routes: Routes = [

  {
    path: 'Listar roles por privilegios',
    component: RolPrivilegeListComponent,
    data: { title: 'List' },
  },
 
  {
    path: 'Crear roles por privilegios',
    component: RolPrivilegeCreateComponent,
    data: { title: 'Create' },
  },  
  
  {
    path: 'Eliminar roles por privilegios',
    component: RolPrivilegeDeleteComponent,
    data: { title: 'List' },
  },

 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolPrivilegeRoutingModule {}
