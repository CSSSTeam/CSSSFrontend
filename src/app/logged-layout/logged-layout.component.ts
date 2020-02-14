import {Component, OnInit} from '@angular/core';
import {User} from '../services/user.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css']
})
export class LoggedLayoutComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    let width = window.innerWidth;
    this.isMenu = width >= 1024;
  }

  isMenu = true;

  showMenu() {
    this.isMenu = !this.isMenu;
  }

  isSett = false;
  isCog = !this.isSett;

  showSettings() {
    this.isSett = !this.isSett;
    this.isCog = !this.isCog;
  }

  logout() {
    User.instance.logout();
  }
}
