import { Component, OnInit } from '@angular/core';
import { UserRolPrivilege } from 'src/app/users/interfaces/user';
import { UserRolPrivilegesService } from '../../user-rol-privileges.service';

@Component({
  selector: 'app-user-rol-privileges-list',
  templateUrl: './user-rol-privileges-list.component.html',
  styleUrls: ['./user-rol-privileges-list.component.css'],
})
export class UserRolPrivilegeListComponent implements OnInit {
  userRolPriviligeFilterSelected: string = '';
  userRolPrivilegesData: UserRolPrivilege[];
  constructor(private userRolPrivilegesService: UserRolPrivilegesService) {}

  async ngOnInit() {
    await this.getDataUserRolPrivileges();
  }

  async getDataUserRolPrivileges() {
    await this.userRolPrivilegesService.getUserRolPrivileges().then((resp) => {
      console.log(resp);
      this.userRolPrivilegesData = resp;
    });
  }
}
