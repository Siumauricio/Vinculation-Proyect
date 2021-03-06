import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanActivateChild, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
import { AuthenticationService } from './authentication.service';
import { RolPrivilege } from './users/interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserAuthenticationGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router, 
              private jwtHelper: JwtHelperService,
              private auth: AuthenticationService){}

 privileges:Array<RolPrivilege>;
  privilegesSize:number;

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      const token=localStorage.getItem('Token');
      const isAuthenticated = localStorage.getItem('isLoggedIn');
      if (isAuthenticated=='true' && token && !this.jwtHelper.isTokenExpired(token)) {
          return true;
      }
      if (isAuthenticated=='true' && token && this.jwtHelper.isTokenExpired(token)) {
        return this.ValidateToken(token);
      }
      return this.FailedAccess();
  }

async ValidateToken(token:string){
  let response:any;
  await this.auth.updateToken(token).then(async (resp)=>{
    response=resp;
   });
   if(response){
     return true;
   }
return this.FailedAccess();
}


FailedAccess(){
 this.auth.logout();
 this.router.navigate(['/login']); 
 return false;
}

  canActivateChild(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
         return (this.checkAccessToPrivilege(decodeURI(route?.url.toString())))? true: this.router.navigate["/home"]; 
  }


   checkAccessToPrivilege(incomingUrl){
    this.privileges=JSON.parse(localStorage.getItem("Privileges"));
    this.privilegesSize=+localStorage.getItem("SizePrivileges");
    if(this.privilegesSize==null) return false;
    for(let i=0; i<this.privilegesSize; i++){
      if(this.privileges[i].name_Privilege==incomingUrl){
        return true;  
      }
   }

   return false;
  }

  


}
