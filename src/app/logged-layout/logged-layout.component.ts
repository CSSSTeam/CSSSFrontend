import {Component, OnInit} from '@angular/core';
import {BasicInfoService} from '../basic-info.service';

@Component({
  selector: 'app-logged-layout',
  templateUrl: './logged-layout.component.html',
  styleUrls: ['./logged-layout.component.css']
})
export class LoggedLayoutComponent implements OnInit {
  date;
  loadDate;

  constructor(private basicInfoService: BasicInfoService) {
    this.date = this.basicInfoService.getDate();
    this.loadDate = setInterval(() => {
      this.date = this.basicInfoService.getDate();
      if (this.date != undefined) {
        clearInterval(this.loadDate);
      }
    }, 500);
  }

  ngOnInit() {

  }

}
