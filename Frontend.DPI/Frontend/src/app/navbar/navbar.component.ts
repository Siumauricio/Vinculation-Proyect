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
  privileges:RolPrivilege[];
  privilegeType:any[]
  constructor(
      public auth: AuthenticationService,
      private router: Router,
      private userService :UsersService
      ) { }

  async ngOnInit() {
    await this.getPrivilegesUser();
  }

 async getPrivilegesUser(){
   await  this.userService.GetPrivilegesByUser(this.auth.currentUser.username).then((resp)=>{
     this.privileges = resp;
     this.auth.privileges=resp;
     localStorage.setItem("Privileges",JSON.stringify(resp));
     localStorage.setItem("SizePrivileges",resp.length);
      console.log('Privilegios: ',this.privileges)
    });

    this.privilegeType = this.getUniqueValuesFromPrivilegeType();
    console.log(this.privilegeType)
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login'])

  }
  


 getUniqueValuesFromPrivilegeType(){
  const unique = [...new Set(this.auth.privileges.map(item => item.tipo_privilegio))];
  let privileges = [];
  for (let i = 0; i < unique.length; i++) {
    let namePrivileges = [];
    for (let j = 0; j < this.auth.privileges.length; j++) {
      if (this.auth.privileges[j].tipo_privilegio == unique[i]) {
        namePrivileges.push(this.auth.privileges[j].name_Privilege);
      }
  }
      const object = {
        privilegeType : unique[i],
        privilege : namePrivileges
      }
      privileges.push(object);
  }

  return privileges;
 }

 checkPrivilegeType(privilegeType,privilegeType2){
   return privilegeType == privilegeType2 ? true:false;
 }
 

}
