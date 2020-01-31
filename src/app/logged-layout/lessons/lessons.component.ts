import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css']
})
export class LessonsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
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

  monLessons = [
    {time: '9:20-10:05', subject: 'Geografia', room: '109'},
    {time: '10:15-11:00', subject: 'Fizyka', room: '107'},
    {time: '11:15-12:00', subject: 'UTK', room: '510'},
    {time: '12:10-12:55', subject: 'UTK', room: '510'},
    {time: '13:05-13:50', subject: 'UTK', room: '510'},
    {time: '13:55-14:40', subject: 'UTK', room: '510'},
    {time: '15:00-15:45', subject: 'ZWO', room: '107'},
  ];
  tueLessons = [
    {time: '9:20-10:05', subject: 'Biologia', room: '109'},
    {time: '10:15-11:00', subject: 'Religia', room: '107'},
    {time: '11:15-12:00', subject: 'WOS', room: '510'},
    {time: '12:10-12:55', subject: 'Historia', room: '510'},
    {time: '13:05-13:50', subject: 'Chemia', room: '510'},
    {time: '13:55-14:40', subject: 'Matematyka', room: '510'},
    {time: '15:00-15:45', subject: 'WOK', room: '107'},
  ];
  wedLessons = [
    {time: '7:30-8:15', subject: 'WF', room: '109'},
    {time: '8:25-9:10', subject: 'WF', room: '107'},
    {time: '9:20-10:05', subject: 'Religia', room: '510'},
    {time: '10:15-11:00', subject: 'J.niemiecki', room: '510'},
    {time: '11:15-12:00', subject: 'J.polski', room: '510'},
    {time: '12:10-12:55', subject: 'EDB', room: '510'},
    {time: '13:05-13:50', subject: 'Informatyka', room: '107'},
  ];
  thuLessons = [
    {time: '8:25-9:10', subject: 'Matematyka', room: '107'},
    {time: '9:20-10:05', subject: 'WF', room: '510'},
    {time: '10:15-11:00', subject: 'J.angielski', room: '510'},
    {time: '11:15-12:00', subject: 'J.angielski', room: '510'},
    {time: '12:10-12:55', subject: 'Matematyka', room: '510'},
    {time: '13:05-13:50', subject: 'SO', room: '107'},
    {time: '13:55-14:40', subject: 'SO', room: '107'},
  ];
  friLessons = [
    {time: '7:30-8:15', subject: 'SO', room: '109'},
    {time: '8:25-9:10', subject: 'SO', room: '107'},
    {time: '9:20-10:05', subject: 'J.polski', room: '510'},
    {time: '10:15-11:00', subject: 'J.polski', room: '510'},
    {time: '11:15-12:00', subject: 'Historia', room: '510'},
    {time: '12:10-12:55', subject: 'PP', room: '510'},
    {time: '13:05-13:50', subject: 'BHP', room: '107'},
  ];

}
