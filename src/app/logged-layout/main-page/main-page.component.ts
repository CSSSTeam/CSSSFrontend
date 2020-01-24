import {Component, OnInit} from '@angular/core';
import {UserService, User} from '../../user.service';
import {LoggedLayoutComponent} from '../logged-layout.component';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [UserService]
})
export class MainPageComponent implements OnInit {
  user;
  date;

  constructor(private loggedLayoutComponent: LoggedLayoutComponent) {
  }

  ngOnInit() {

    this.user = User.instance;
    this.date = this.loggedLayoutComponent.date;
    console.log(this.date);
  }
}
