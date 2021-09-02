import { Rol } from './../../users/interfaces/user';
import { Component, OnInit } from '@angular/core';
import { User } from '../../users/interfaces/user';
import { UsersService } from '../../users/users.service';

@Component({
  selector: 'app-rol-list',
  templateUrl: './rol-list.component.html',
  styleUrls: ['./rol-list.component.css']
})
export class RolListComponent implements OnInit {

  userFilterSelected: string = '';
  Roles: Rol[];
  constructor(private userService: UsersService) {}

  async ngOnInit() {
    await this.getRoles();
  }

  async getRoles() {
    await this.userService.getRols().then((resp) => {
      this.Roles = resp;
    });
  }

}
