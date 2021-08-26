import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  openSidebar:boolean=false;
  isLoggedIn:boolean;

  constructor(private auth: AuthenticationService) { }

  ngOnInit(): void {
    this.isLoggedIn = this.auth.isLoggedIn;
    console.log(this.isLoggedIn);
  }

}
