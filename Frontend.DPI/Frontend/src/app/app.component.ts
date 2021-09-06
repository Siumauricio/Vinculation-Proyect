import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { Subject } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})


export class AppComponent {
  title = 'Frontend';

  userActivity;
  userInactive: Subject<any> = new Subject();

  constructor(private auth:AuthenticationService,
              private router: Router) {
    this.setTimeout();
    this.userInactive.subscribe(() => {
      this.auth.logout();
      this.router.navigate(["login"]);
    });
  }

  setTimeout() {
    this.userActivity = setTimeout(() => this.userInactive.next(undefined), 3600000);
  }

  @HostListener('window:keydown')
  @HostListener('window:mousemove') refreshUserState() {
    clearTimeout(this.userActivity);
    this.setTimeout();
  }

}
