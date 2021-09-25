import { PoliceRecordUpdateComponent } from './police-record-update/police-record-update.component';

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PoliceRecordCreateComponent } from './police-record-create/police-record-create.component';
import { PoliceRecordDeleteComponent } from './police-record-delete/police-record-delete.component';
import { PoliceRecordListComponent } from './police-record-list/police-record-list.component';


const routes: Routes = [
  {
    path: 'Listar Historial Policial',
    component:  PoliceRecordListComponent,
    data: { title: 'update' },
  },
  {
    path: 'Crear Historial Policial',
    component:  PoliceRecordCreateComponent,
    data: { title: 'update' },
  },
  {
    path: 'Eliminar Historial Policial',
    component:  PoliceRecordDeleteComponent,
    data: { title: 'update' },
  },
  {
    path: 'Modificar Historial Policial',
    component: PoliceRecordUpdateComponent,
    data: { title: 'update' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PoliceRecordRoutingModule { }