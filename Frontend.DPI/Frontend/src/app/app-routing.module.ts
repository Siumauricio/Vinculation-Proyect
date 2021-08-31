import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { PagenotfoundComponent } from './pagenotfound/pagenotfound.component';
import { UserAuthenticationGuard } from './user-authentication.guard';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'users',
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },
      {
        path: 'roles',
        loadChildren: () =>
          import('./Roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'departamentos',
        loadChildren: () =>
          import('./Departamentos/department.module').then((m) => m.DepartmentModule),
      },
    ],
    canActivate: [UserAuthenticationGuard],
  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PagenotfoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
