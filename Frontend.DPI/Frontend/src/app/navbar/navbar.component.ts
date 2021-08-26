import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';
import { User } from '../users/interfaces/user';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openSidebar:boolean=false;
  user:User
  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem("currentUser"));
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['login'])
  }

}
