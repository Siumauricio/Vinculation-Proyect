import { Component, OnInit } from '@angular/core';
import { UserRolPrivilege } from '../../../users/interfaces/user';
import { UserRolPrivilegesService } from '../../user-rol-privileges.service';

@Component({
  selector: 'app-user-rol-privileges-list',
  templateUrl: './user-rol-privileges-list.component.html',
  styleUrls: ['./user-rol-privileges-list.component.css'],
})
export class UserRolPrivilegeListComponent implements OnInit {
  userRolPriviligeFilterSelected: string = '';
  userRolPrivilegesData: UserRolPrivilege[];
  totalRecords :number;
  page:number =1;
  constructor(private userRolPrivilegesService: UserRolPrivilegesService) {}

  async ngOnInit() {
    await this.getDataUserRolPrivileges();
  }

  async getDataUserRolPrivileges() {
    await this.userRolPrivilegesService.getUserRolPrivileges().then((resp) => {
      this.userRolPrivilegesData = resp;
    });
  }
}
