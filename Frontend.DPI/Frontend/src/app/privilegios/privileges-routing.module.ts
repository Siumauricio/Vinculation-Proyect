import { PrivilegesListComponent } from './privileges-list/privileges-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'Listar Privilegios',
    component: PrivilegesListComponent,
    data: { title: 'List' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PrivilegesRoutingModule {}