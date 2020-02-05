import {Component, OnInit} from '@angular/core';
import {TimeTableService} from '../../time-table.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [TimeTableService]
})
export class LessonsComponent implements OnInit {

  isTabsOpen = {};

  timetable() {
    return this.timetableService.getTimetable();
  }

  constructor(private timetableService: TimeTableService) {
    for (let day in timetableService.daysOfWeek) {
      console.log(day);
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
    console.log(object);
    return object == undefined ? '‎‏‏‎ ‎‎' : object[tag];
  }
}