import { RolCreateComponent } from './rol-create/rol-create.component';
import { RolDeleteComponent } from './rol-delete/rol-delete.component';
import { RolListComponent } from './rol-list/rol-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Listar Rol',
    component: RolListComponent,
    data: { title: 'List' },
  },
  {
    path: 'Eliminar Rol',
    component: RolDeleteComponent,
    data: { title: 'List' },
  },
  {
    path: 'Crear Rol',
    component: RolCreateComponent,
    data: { title: 'List' },
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RolesRoutingModule {}