import {Component, OnInit} from '@angular/core';
import {ScrollService} from '../services/scroll.service';
import {Router} from '@angular/router';
import {User} from '../services/user.service';
import {Group, PermissionsService} from '../services/permissions.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css'],
  providers: [PermissionsService]
})
export class LoggedLayoutComponent implements OnInit {

  isMenu: boolean;

  constructor(
    protected router: Router,
    private scrollService: ScrollService,
    protected permissions: PermissionsService
  ) {
  }

  ngOnInit() {

    if (window.screen.height != 0) {
      this.scrollService.scrollUp();
    }

    this.isMenu = window.innerWidth >= 1024;

  }

  showMenu() {
    this.isMenu = !this.isMenu;
  }

  navTo() {
    if (window.innerWidth < 1024) {
      this.scrollService.scrollDown(550, 0);
      this.isMenu = false;
    }
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

  isRedactor() {
    return this.permissions.hasPerm([Group.moderator, Group.president, Group.vicePresident, Group.admin]);
  }
}
