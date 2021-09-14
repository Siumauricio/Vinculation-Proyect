import { SospechosoDeleteComponent } from './sospechoso-delete/sospechoso-delete.component';
import { SospechosoUpdateComponent } from './sospechoso-update/sospechoso-update.component';
import { SospechosoListPerDayComponent } from './sospechoso-list-per-day/sospechoso-list-per-day.component';
import { SospechosoCreateComponent } from './sospechoso-create/sospechoso-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuspectListComponent } from './sospechoso-list/suspect-list.component';
import { DatePipe } from '@angular/common';
import { SospechosoListPerDayChiefComponent } from './sospechoso-list-per-day-chief/sospechoso-list-per-day-chief.component';

const routes: Routes = [
  {
    path: 'Listar Sospechosos',
    component: SuspectListComponent,
    data: { title: 'List' },
  },
  {
    path: 'Agregar Sospechosos',
     component: SospechosoCreateComponent,
    data: { title: 'List' },
  },
  {
    path: 'Listar Sospechosos Ingresados Hoy',
     component: SospechosoListPerDayComponent,
    data: { title: 'List' },
  },

  {
    path: 'Sospechosos Ingresados Hoy Nacional',
     component: SospechosoListPerDayChiefComponent,
    data: { title: 'List' },
  },

  {
    path: 'Modificar Sospechosos',
     component: SospechosoUpdateComponent,
    data: { title: 'List' },
  },
  {
    path: 'Eliminar Sospechosos',
     component: SospechosoDeleteComponent,
    data: { title: 'List' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [DatePipe]
})
export class SuspectRoutingModule {}