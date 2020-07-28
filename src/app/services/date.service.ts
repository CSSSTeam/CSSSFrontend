import { Injectable, ComponentFactoryResolver } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as data from '../../config.json';
import { TimeTableService } from './time-table.service';

@Injectable({
  providedIn: 'root',
})
export class DateService {

  data;
  dayProps;
  temp;
  day = {
    index: 0,
    name: '',
    plName: ''
  };

  constructor(
    private http: HttpClient,
    public timetableService: TimeTableService
  ) {
    this.data = (data as any).default;
  }

  getDate(): Observable<any> {
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token' + localStorage.getItem('token')
      })
    };
    return this.http.get(this.data.server + this.data.endpoints.date, httpOption);
  }

  setDay(index, x = false) {
    this.dayProps = this.timetableService.daysOfWeek[index];
    if (x) this.dayProps = this.timetableService.daysOfWeekend[index];
  }

  getDayProps(property) {
    this.getDate().subscribe(
      (data: any) => {
        let myDate = new Date(data.date).getDay();

        const tt = this.timetableService.daysOfWeek;

        if (property === "index") this.temp = myDate - 1;
        else if (property === "name") this.temp = tt[myDate - 1][0];
        else if (property === "plName") this.temp = tt[myDate - 1][1];
        else if (property === "all") this.temp = tt[myDate - 1];
        else alert("getDayProps() - zły atrybut")

      },
      error => console.error(error)
    );
    return this.temp;
  }

  /* getDayProps(x = 0, name, index, plName) {
    this.getDate().subscribe(
      (data: any) => {
        let myDate = new Date(data.date).getDay();
  
        switch (myDate) {
          case 1: this.setDay(0); break;
          case 2: this.setDay(1); break;
          case 3: this.setDay(2); break;
          case 4: this.setDay(3); break;
          case 5: this.setDay(4); break;
          case 6: this.setDay(0, true); break;
          case 7: this.setDay(1, true); break;
          default: console.error("date.service -> getDayName()")
        }
  
        this.day.index = myDate - 1;
        this.day.name = this.dayProps[0];
        this.day.plName = this.dayProps[1];
  
        return this.day;
      },
      error => console.error(error)
    );
  } */



  /*  export class Date {
  
   data;
   dayProps;
   temp;
   day = {
     index: 0,
     name: '',
     plName: ''
   };
   dateService: DateService;
  
   constructor(
     dateService: DateService,
     timetableService: TimeTableService
   ) {
     this.dateService = dateService;
     dateService.getDate().subscribe(
       (data: any) => {
         let myDate = new Date(data.date).getDay();
  
         const tt = this.timetableService.daysOfWeek;
  
         if (property === "index") this.temp = myDate - 1;
         else if (property === "name") this.temp = tt[myDate - 1][0];
         else if (property === "plName") this.temp = tt[myDate - 1][1];
         else if (property === "all") this.temp = tt[myDate - 1];
         else alert("getDayProps() - zły atrybut")
  
  
       },
       error => console.error(error)
     );
   }
  
  } */
}