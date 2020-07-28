import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as data from '../../config.json';
import { Router } from '@angular/router';


@Injectable()
export class UserService {

  dataURL;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
  }

  loginUser(userData) {
    const url = this.dataURL.server + this.dataURL.endpoints.login;
    return this.http.post(url, userData);
  }

  createUser(token, router: Router) {
    User.instance = new User(token, this, router);
  }

  logoutUser(token): Observable<any> {
    const url = this.dataURL.server + this.dataURL.endpoints.logout;
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    return this.http.post(url, httpOption);
  }

  getProfileUser(token): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    return this.http.get(this.dataURL.server + this.dataURL.endpoints.infoUser, httpOption);
  }

  isLogged() {
    return User.instance != null;
  }

  changePassword(form): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.loggedUserChangePassword;
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.post(url, form, httpOption).subscribe(
      (data: any) => {
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }
}

export class User {
  public static instance: User;
  firstName: '';
  lastName: '';
  username: '';
  email: '';
  groups;

  token: '';
  userService: UserService;
  router: Router;

  constructor(token, userService: UserService, router: Router) {
    this.userService = userService;
    this.router = router;
    userService.getProfileUser(token).subscribe(
      (data: any) => {
        localStorage.setItem('token', token);
        this.initData(data, token);
      },
      error => {
        if (error.status == 401 && error.error == 'Token is Invalid') {
          User.instance = null;
          router.navigate(['/login']);
          return;
        }
        if (error.status == 0) {
          let userString = localStorage.getItem('user');
          this.initData(JSON.parse(userString), token);
        }
      }
    );
  }
  initData(data, token) {
    this.firstName = data.firstName;
    this.lastName = data.lastName;
    this.email = data.email;
    this.token = token;
    this.groups = data.groups;
    console.log(this);
    localStorage.setItem('user', JSON.stringify({
      'firstName': data.firstName,
      'lastName': data.lastName,
      'email': this.email,
      'token': this.token,
      'groups': this.groups
    }));

  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    User.instance = null;
    this.router.navigate(['/login']);
    this.userService.logoutUser(this.token);
  }
}
