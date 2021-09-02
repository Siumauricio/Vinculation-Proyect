import { UsersService } from './../users/users.service';
import { Component, OnInit } from '@angular/core';
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
  privileges:RolPrivilege;
  constructor(public auth: AuthenticationService, private router: Router,private userService :UsersService) { }

  async ngOnInit() {
    await this.getPrivilegesUser();
  }
 async getPrivilegesUser(){
   await  this.userService.GetPrivilegesByUser(this.auth.currentUser.username).then((resp)=>{
     this.privileges = resp;
      console.log('Privilegios: ',this.privileges)
    });
  }

  logout() {
    this.auth.openSidebar=false;
    this.auth.logout();
    this.router.navigate(['login'])
    
  }

}
