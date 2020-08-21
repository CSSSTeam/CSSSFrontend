import { Component, OnInit } from '@angular/core';
import {SupportService} from '../services/support.service';
import {Router} from '@angular/router';
import {UserService, User} from '../services/user.service';
import { Group, PermissionsService, PermissionGuard } from '../services/permissions.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css'],
  providers: [UserService, PermissionsService]
})
export class LoggedLayoutComponent implements OnInit {

  user;
  isMenu: boolean;

  public userPanelAuthGroup = PermissionGuard.userPanelAuthGroup;

  constructor(
    protected router: Router,
    public permissions: PermissionsService,
    protected supportService: SupportService,
  ) {

  }

  ngOnInit() {

    this.user = User.instance;

    if (window.screen.height != 0) {
      this.supportService.scrollUp();
    }

    this.isMenu = window.innerWidth >= 1350;
  }

  showMenu() {
    this.isMenu = !this.isMenu;
  }

  navTo() {
    if (window.innerWidth <= 1350) {
      this.supportService.scrollDown(document.querySelector('#mainNav').clientHeight, 0);
      this.isMenu = false;
    }
  }

  isSett: boolean = false;
  isCog: boolean = true;


  showSettings() {
    this.isSett = !this.isSett;
    this.isCog = !this.isCog;
  }

  switchMenu() {
    if (this.isMenu)
      this.isMenu = window.innerWidth >= 1350;
    this.isSett = !this.isSett;
    this.isCog = !this.isCog;
  }

  logout() {
    User.instance.logout();
  }

  isRedactor() {
    return this.permissions.hasPerm([Group.moderator, Group.president, Group.vicePresident, Group.admin]);
  }

  isAdmin() {
    return this.permissions.hasPerm([Group.president, Group.vicePresident, Group.admin]);
  }
}
