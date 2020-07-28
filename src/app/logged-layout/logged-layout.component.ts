import { Component, OnInit } from '@angular/core';
import { SupportService } from '../services/support.service';
import { Router, RouterOutlet } from '@angular/router';
import { UserService, User } from '../services/user.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css'],
  providers: [UserService]
})
export class LoggedLayoutComponent implements OnInit {

  user;
  isMenu: boolean;

  constructor(
    protected router: Router,
    private scrollService: SupportService
  ) { }

  ngOnInit() {

    this.user = User.instance;

    if (window.screen.height != 0) this.scrollService.scrollUp();

    this.isMenu = window.innerWidth >= 1350;

  }

  showMenu() {
    this.isMenu = !this.isMenu;
  }
  navTo() {
    if (window.innerWidth <= 1350) {
      this.scrollService.scrollDown(document.querySelector('#mainNav').clientHeight, 0);
      this.isMenu = false;
    }
  }

  isSett: boolean = false;
  isCog: boolean = true;

  showSettings() {
    this.isSett = !this.isSett;
    this.isCog = !this.isCog;
  }

  logout() {
    User.instance.logout();
  }
}
