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
        path: 'rolPrivilege',
        loadChildren: () =>
          import('./rol_privileges/rol_privilege.module').then((m) => m.RolPrivilegesModule),
      },
      {
        path: 'userRolPrivilege',
        loadChildren: () =>
          import('./user-rol-privilege/user-rol-privileges.module').then((m) => m.UserRolPrivilegesModule),
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
      {
        path: 'privilegios',
        loadChildren: () =>
          import('./privilegios/privileges.module').then((m) => m.PrivilegesModule),
      },
      {
        path: 'sospechosos',
        loadChildren: () =>
          import('./sospechosos/suspect.module').then((m) => m.SuspectModule),
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
