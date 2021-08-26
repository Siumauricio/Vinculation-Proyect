import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openSidebar:boolean=false;

  constructor(public auth: AuthenticationService, private router: Router) { }

  ngOnInit(): void {}

  logout() {
    this.auth.logout();
    this.router.navigate(['login'])
  }

}
