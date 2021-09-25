import { CriminalRecordCreateComponent } from './criminal-record-create/criminal-record-create.component';
import { CriminalRecordUpdateComponent } from './criminal-record-update/criminal-record-update.component';
import { CriminalRecordDeleteComponent } from './criminal-record-delete/criminal-record-delete.component';
import { CriminalRecordListComponent } from './criminal-record-list/criminal-record-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  {
    path: 'Listar Historial Criminal',
    component:  CriminalRecordListComponent,
    data: { title: 'update' },
  },
  {
    path: 'Eliminar Historial Criminal',
    component:  CriminalRecordDeleteComponent,
    data: { title: 'update' },
  },
  {
    path: 'Modificar Historial Criminal',
    component:  CriminalRecordUpdateComponent,
    data: { title: 'update' },
  },
  {
    path: 'Agregar Historial Criminal',
    component: CriminalRecordCreateComponent,
    data: { title: 'update' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriminalsRecordRoutingModule { }