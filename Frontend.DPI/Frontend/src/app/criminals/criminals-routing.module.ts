import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CriminalCreateComponent } from './criminal-create/criminal-create.component';
import { CriminalListComponent } from './criminal-list/criminal-list.component';
import { CriminalUpdateComponent } from './criminal-update/criminal-update.component';

const routes: Routes = [
  {
    path: 'Agregar Caracteristicas Personales',
    component: CriminalCreateComponent,
    data: { title: 'update' },
  },
  {
    path: 'Listar Caracteristicas Personales',
    component: CriminalListComponent,
    data: { title: 'update' },
  },
  {
    path: 'Modificar Caracteristicas Personales',
    component: CriminalUpdateComponent,
    data: { title: 'update' },
  },
  {
    path: 'Eliminar Criminales',
    component: CriminalUpdateComponent,
    data: { title: 'update' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriminalsRoutingModule { }
