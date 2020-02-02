import {Component, OnInit} from '@angular/core';
import {TimeTableService} from '../../time-table.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [TimeTableService]
})
export class LessonsComponent implements OnInit {

  constructor(private timetableService: TimeTableService) {

  }

  ngOnInit() {
  }

  displayLesson(lessonElementElement: any) {
    return lessonElementElement != null ? lessonElementElement['name'] : '';
  }

  isMonday = false;
  showMonday() {
    if(this.isMonday==false) {
        this.isMonday = true;
        document.querySelector("#open").className = "icon-cancel open";
    } else {
        this.isMonday = false;
        document.querySelector("#open").className = "icon-down-open open";
    }   
  }
  isTuesday = false;
  showTuesday() {
    if(this.isTuesday==false) {
        this.isTuesday = true;
        document.querySelector("#open1").className = "icon-cancel open";
    } else {
        this.isTuesday = false;
        document.querySelector("#open1").className = "icon-down-open open";
    }
  }
  isWednesday = false;
  showWednesday() {
    if(this.isWednesday==false) {
        this.isWednesday = true;
        document.querySelector("#open2").className = "icon-cancel open";
    } else {
        this.isWednesday = false;
        document.querySelector("#open2").className = "icon-down-open open";
    }
  }
  isThursday = false;
  showThursday() {
    if(this.isThursday==false) {
        this.isThursday = true;
        document.querySelector("#open3").className = "icon-cancel open";
    } else {
        this.isThursday = false;
        document.querySelector("#open3").className = "icon-down-open open";
    }
  }
  isFriday = false;
  showFriday() {
    if(this.isFriday==false) {
        this.isFriday = true;
        document.querySelector("#open4").className = "icon-cancel open";
    } else {
        this.isFriday = false;
        document.querySelector("#open4").className = "icon-down-open open";
    }
  }

}
