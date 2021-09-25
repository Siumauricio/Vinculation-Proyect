import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistorialCriminalCreateComponent } from './criminal-create/criminal-create.component';
import { HistorialCriminalDeleteComponent } from './criminal-delete/criminal-delete.component';
import { HistorialCriminalListComponent } from './criminal-list/criminal-list.component';
import { HistorialCriminalUpdateComponent } from './criminal-update/criminal-update.component';

const routes: Routes = [
  {
    path: 'Agregar Historial Delictivo',
    component:  HistorialCriminalCreateComponent,
    data: { title: 'update' },
  },
  {
    path: 'Listar Historial Delictivo',
    component:  HistorialCriminalListComponent,
    data: { title: 'update' },
  },
  {
    path: 'Modificar Historial Delictivo',
    component:  HistorialCriminalUpdateComponent,
    data: { title: 'update' },
  },
  {
    path: 'Eliminar Historial Delictivo',
    component: HistorialCriminalDeleteComponent,
    data: { title: 'update' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriminalsRoutingModule { }