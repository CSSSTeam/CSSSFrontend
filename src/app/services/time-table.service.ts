import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import * as data from '../../config.json';

@Injectable({
  providedIn: 'root',
})
export class TimeTableService {
  private timetable;
  private dataURL;
  public daysOfWeek;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    this.loadTimetable4everyone();
    this.daysOfWeek = this.dataURL.daysOfWeek;
  }

  loadTimetable4everyone() {
    const url = this.dataURL.server + this.dataURL.endpoints.timetable.get;
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    let timetableStringify = localStorage.getItem('myTimetable');

    if (timetableStringify != null) {
      this.timetable = JSON.parse(timetableStringify);
      return;
    }
    this.http.get(url, httpOption).subscribe(
      (data: any) => {
        console.log(data);
        this.timetable = data;
        console.log(data);
        localStorage.setItem('myTimetable', JSON.stringify(data));
      },
      () => {
        this.timetable = {
          'error': 'timetable is not load because you do not have internet'
        };
      }
    );
  }

  getTimetable() {
    return this.timetable;
  }

}

