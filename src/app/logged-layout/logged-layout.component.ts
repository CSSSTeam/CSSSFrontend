import {Component, OnInit} from '@angular/core';
import {ScrollService} from '../scroll.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css']
})
export class LoggedLayoutComponent implements OnInit {

  isMenu:boolean;

  constructor(
    protected router: Router,
    private scrollService: ScrollService
  ) {}

  ngOnInit() {

    if(window.screen.height != 0) this.scrollService.scrollToTop();

    (window.innerWidth >= 1024) ? this.isMenu = true : this.isMenu = false;
    
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
