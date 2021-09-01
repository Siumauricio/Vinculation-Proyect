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
      }

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
