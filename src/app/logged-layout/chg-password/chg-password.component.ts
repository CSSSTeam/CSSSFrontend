import { Component, Input, OnInit } from '@angular/core';
import {UserService} from '../../services/user.service';

@Component({
  selector: 'app-chg-password',
  templateUrl: './chg-password.component.html',
  styleUrls: ['./chg-password.component.css']
})
export class ChgPasswordComponent implements OnInit {
  changePasswordForm: any;
  info = '';

  constructor(private supportService: SupportService,private userService: UserService) {
    this.changePasswordForm = {
      oldPass: '',
      newPass: '',
      newPass2: ''
    };
  }

  ngOnInit() {

  }

  changePassword() {
    this.supportService.popup("zmieniono hasło");
  }

  changePassword() {
    console.log(this.changePasswordForm);
    this.userService.changePassword(this.changePasswordForm).then(() =>
      this.info = 'CHANGED'
    ).catch(
      error => {
        console.error(error);
        this.info = 'some Error';
      }
    );
  }
}
