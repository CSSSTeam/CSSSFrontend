import { Component, OnInit } from '@angular/core';
import { TimeTableService } from '../../services/time-table.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [TimeTableService]
})
export class LessonsComponent implements OnInit {

  whichDay: string;
  isTabsOpen = [];
  isActive = [];
  isConfigEnabled: boolean = true;
  lastTimeTable = [];
  days = {};
  mainTimeTable: boolean;

  timetable() {
    return this.timetableService.getTimetable();
  }

  constructor(public timetableService: TimeTableService) {
    this.isTabsOpen['monday'] = 'monday';
    this.whichDay = 'monday';

    for (let day of timetableService.daysOfWeek) {
      this.isActive[day[0]] = false;
    }
    this.isActive['monday'] = true;
  }

  ngOnInit() {
    for (let i = 0; i <= 4; i++)
      this.days[this.timetableService.daysOfWeek[i][0]] = false;

    if (window.innerWidth >= 650) this.mainTimeTable = true;
    else this.mainTimeTable = false;
  }

  showDay(day: string) {
    this.whichDay = day;
    const temp = this.days[day];

    for (let i = 0; i <= 4; i++)
      this.days[this.timetableService.daysOfWeek[i][0]] = false;

    this.days[day] = !temp;

    if (this.isTabsOpen[day] != day) this.isTabsOpen[day] = day;

    for (let day of this.timetableService.daysOfWeek)
      this.isActive[day[0]] = false;
    this.isActive[day] = true;
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
}