import { Component, OnInit } from '@angular/core';
import {RolPrivilege } from '../../interfaces/rol-privilege';
import { RolPrivilegeService } from '../../rol_privilege.service';

@Component({
  selector: 'app-rol-privilege-list',
  templateUrl: './rol-privilege-list.component.html',
  styleUrls: ['./rol-privilege-list.component.css'],
})
export class RolPrivilegeListComponent implements OnInit {
  rolPrivilegeFilterSelected: string = '';
  rolPrivilegeData: RolPrivilege[];
  constructor(private rolPrivilegeService: RolPrivilegeService) {}

  async ngOnInit() {
    await this.getDataRolPrivilege();
  }

  async getDataRolPrivilege() {
    await this.rolPrivilegeService.getRolPrivileges().then((resp) => {
      this.rolPrivilegeData = resp;
    });
  }
}
