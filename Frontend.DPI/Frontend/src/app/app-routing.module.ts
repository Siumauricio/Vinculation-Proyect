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
        canActivate: [UserAuthenticationGuard],
      },
      {
        path: 'home',
        component: HomeComponent,
        canActivate: [UserAuthenticationGuard]
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./users/users.module').then((m) => m.UsersModule),
      },

      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./rol_privileges/rol_privilege.module').then((m) => m.RolPrivilegesModule),
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./user-rol-privilege/user-rol-privileges.module').then((m) => m.UserRolPrivilegesModule),
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./Roles/roles.module').then((m) => m.RolesModule),
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./Departamentos/department.module').then((m) => m.DepartmentModule),
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./privilegios/privileges.module').then((m) => m.PrivilegesModule),
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        canActivateChild:[UserAuthenticationGuard],
        loadChildren: () =>
          import('./sospechosos/suspect.module').then((m) => m.SuspectModule),
      },
      {
        path: 'privileges',
        canActivate: [UserAuthenticationGuard],
        loadChildren: () =>
          import('./criminals/criminals.module').then((m)=> m.CriminalsModule),
      }

],

  },
  { path: 'login', component: LoginComponent },
  { path: '**', component: PagenotfoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
