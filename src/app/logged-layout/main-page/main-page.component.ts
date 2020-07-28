import { Component, OnInit } from '@angular/core';
import { TimeTableService } from '../../services/time-table.service';
import { UserService, User } from '../../services/user.service';
import { SupportService } from 'src/app/services/support.service';
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [TimeTableService, UserService, SupportService, DateService]
})
export class MainPageComponent implements OnInit {

  whichDay;
  isActive = false;
  isConfigEnabled: boolean = true;

  timetable() {
    return this.timetableService.getTimetable();
  }

  constructor(
    public timetableService: TimeTableService,
    public dateService: DateService
  ) {
    console.log(this.dateService.getDayProps('name'));
    // console.log(this.dateService.getDayProps("index"));
  }

  ngOnInit() {
  }

  showDate() {


  }

  displayText(object: any, tag: string): string {
    return object == undefined ? '‎‏‏‎‎‎' : object[tag];
  }

  mgmtStart() {

  }

  displayTime(timeElement: string) {
    let time = timeElement.split(':');
    return time[0] + ':' + time[1];
  }

  createLesson() {
  }

  logout() {
    User.instance.logout();
  }

}