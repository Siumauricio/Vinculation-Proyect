import {DepartamentoCreateComponent } from './departamento-create/departamento-create.component';
import { DepartamentoDeleteComponent } from './departamento-delete/departamento-delete.component';
import { DepartamentoListComponent } from './departamento-list/departamento-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Listar Departamentos',
    component: DepartamentoListComponent,
    data: { title: 'List' },
  },
  {
    path: 'Eliminar Departamentos',
    component: DepartamentoDeleteComponent,
    data: { title: 'List' },
  },
  {
    path: 'Crear Departamentos',
    component: DepartamentoCreateComponent,
    data: { title: 'List' },
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepartamentRoutingModule {}