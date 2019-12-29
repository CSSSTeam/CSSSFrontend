import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import * as data from '../config.json';
import {Router} from '@angular/router';


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

  getProfileUser(token): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + token
      })
    };
    return this.http.get(this.dataURL.server + this.dataURL.endpoints.infoUser, httpOption);
  }

  profilError(error, router) {
    if (error.status == 401 && error.error == 'Token is Invalid') {
      User.instance = null;
      router.navigate(['/login']);
      return;
    }
  }

  isLogged() {
    return User.instance != null;
  }
}

export class User {
  public static instance: User;
  firstName: '';
  lastName: '';
  username: '';
  email: '';
  token: '';
  groups: {};

  constructor(token, userService: UserService, router: Router) {
    userService.getProfileUser(token).subscribe(
      (data: any) => {
        localStorage.setItem('token', token);
        this.firstName = data.FirstName;
        this.lastName = data.LastName;
        this.email = data.Email;
        this.token = token;
        this.groups = data.Groups;
        router.navigate(['/']);
      },
      error => userService.profilError(error, router)
    );


  }

}
