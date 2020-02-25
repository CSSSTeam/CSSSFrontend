import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService} from '../services/user.service';
import { ScrollService } from '../services/scroll.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css'],
  providers: [UserService]
})
export class LoginPageComponent implements OnInit {

  title = 'csssFrontend';
  loginForm:any;
  errorForm:any;

  constructor(
    private router: Router,
    private userService: UserService,
    private scrollService: ScrollService
  ) { }

  ngOnInit() {

    if(window.innerWidth > window.innerHeight) this.scrollService.scrollDown(window.screen.height, 1500);

    this.loginForm = {
      username: '',
      password: ''
    };
    this.errorForm = {
      global: '',
      username: '',
      password: ''
    };
    
  }

  login() {
    this.userService.loginUser(this.loginForm).subscribe(
      (data: any) => {
        this.userService.createUser(data.token, this.router);
      },
      error => this.loginError(error.error)
    );

  }

  private loginError(error: any) {
    if (error.non_field_errors != null || error.non_field_errors !== 'undefined') {
      this.errorForm.global = error.non_field_errors;
    }
    if (error.username != null && error.username !== 'undefined') {
      this.errorForm.username = error.username;
    }
    if (error.password != null && error.password !== 'undefined') {
      this.errorForm.password = error.password;
    }
    console.log(error);
  }

  displayError(text: string) {
    if (text != null && text !== 'undefined') {
      return text;
    }
    return '';
  }
}

