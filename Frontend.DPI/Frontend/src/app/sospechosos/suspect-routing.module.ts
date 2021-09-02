import { SospechosoCreateComponent } from './sospechoso-create/sospechoso-create.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SuspectListComponent } from './sospechoso-list/suspect-list.component';

const routes: Routes = [
  {
    path: 'Listar Sospechosos',
    component: SuspectListComponent,
    data: { title: 'List' },
  },
  {
    path: 'Modificar Sospechosos',
    // component: RolDeleteComponent,
    data: { title: 'List' },
  },
  {
    path: 'Agregar Sospechoso',
     component: SospechosoCreateComponent,
    data: { title: 'List' },
  },
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SuspectRoutingModule {}