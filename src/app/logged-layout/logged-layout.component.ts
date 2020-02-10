import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css']
})
export class LoggedLayoutComponent implements OnInit {

  isMenu:any;

  constructor() {
  }

  ngOnInit() {
    let width = window.innerWidth;
    if(width >= 1024) this.isMenu = true;
    else this.isMenu = false;
  }

  showMenu() {
    this.isMenu = !this.isMenu;   
  }

  isSett = false;
  isCog = !this.isSett;
  showSettings() {
    this.isSett = !this.isSett;
    this.isCog = !this.isCog;
  }

}
