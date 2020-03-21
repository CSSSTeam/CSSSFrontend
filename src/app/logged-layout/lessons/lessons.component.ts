import {Component, OnInit} from '@angular/core';
import {TimeTableService} from '../../services/time-table.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [ TimeTableService ]
})
export class LessonsComponent implements OnInit {

  isTabsOpen = {};
  isConfigEnabled: boolean = true;

  timetable() {
    return this.timetableService.getTimetable();
  }

  constructor(public timetableService: TimeTableService) {
    for (let day of timetableService.daysOfWeek) {
      this.isTabsOpen[day[0]] = false;
    }
  }

  ngOnInit() {
  }

  showDay(day: string) {
    if (this.isTabsOpen[day] == false) {
      this.isTabsOpen[day] = true;
      document.querySelector('#tab' + day).className = 'icon-cancel open';
    } else {
      this.isTabsOpen[day] = false;
      document.querySelector('#tab' + day).className = 'icon-down-open open';
    }
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
