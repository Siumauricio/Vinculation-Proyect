import { UsersService } from './../users/users.service';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { RolPrivilege, User } from '../users/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  user:User
  privileges:RolPrivilege[];
  constructor(
      public auth: AuthenticationService,
      private router: Router,
      private userService :UsersService,private cd: ChangeDetectorRef
      ) { }

  async ngOnInit() {
    await this.userService.loadPrivilegesUser();
    this.cd.detectChanges();
  }



  logout() {
    this.auth.logout();
    this.router.navigate(['/login'])

  }

}
