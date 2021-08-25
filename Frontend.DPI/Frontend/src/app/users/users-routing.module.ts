import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UsersCrudComponent } from './users-crud/users-crud.component';

const routes: Routes = [
  {
    path:'create',
    component: UsersCrudComponent,
    data: {title: 'create'}
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
