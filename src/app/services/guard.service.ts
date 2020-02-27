import {Injectable} from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import {UserService} from './user.service';

@Injectable(

)
export class GuardService implements CanActivate {


  constructor(protected router: Router,
              private userService: UserService) {
  }

  canActivate() {
    if (this.userService.isLogged()) {
      // logged in so return true
      return true;
    }
    const token = localStorage.getItem('token');
    if (token != null) {
      this.userService.createUser(token, this.router);
      return true;
    }
    // not logged in so redirect to login page
    this.router.navigate(['/login']);
    return false;
  }
}
