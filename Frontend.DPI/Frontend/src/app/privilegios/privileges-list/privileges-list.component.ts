import { PrivilegesService } from './../privileges.service';
import { Component, OnInit } from '@angular/core';
import { Privileges } from '../../users/interfaces/user';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-privileges-list',
  templateUrl: './privileges-list.component.html',
  styleUrls: ['./privileges-list.component.css']
})
export class PrivilegesListComponent implements OnInit {

  userFilterSelected: string = '';
  privileges: Privileges[];
  constructor(private privilegesService: PrivilegesService) {}

  async ngOnInit() {
    await this.getRoles();
  }

  async getRoles() {
    await this.privilegesService.getPrivileges().then((resp) => {
      console.log(resp);
      this.privileges = resp;
    });
  }

}
