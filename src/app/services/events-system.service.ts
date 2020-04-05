import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class EventsSystemService {
  events = {};
  private weekEvents;
  private dataURL;
  public daysOfWeek;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    this.daysOfWeek = this.dataURL.daysOfWeek;
  }

  addEvent(eventData): Promise<any> {

    eventData.dateStart += 'T12:00';
    eventData.dateEnd += 'T12:00';

    let url = this.dataURL.server + this.dataURL.endpoints.events.create;
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    };

    return new Promise<any>((p, e) => this.http.post(url, eventData, httpOption).subscribe(
      data => {
        console.log('ok');
        p(data);
      },
      (err: any) => {
        e(err);
      }
    ));
  }


  /*
    addEvent is a function which get all Events between Dates
    It require dateTimeStart and dateTimeEnd is string in specialFormat(YYYY-MM-DD)

    return
    array of event Type

    example:
    addEvent("2020-03-20T12:00","2020-03-31T12:00")->promise<any> (p->[
      {
        "pk": 3,
        "name": "event1",
        "eventType": 1,
        "dateStart": "2020-03-10T12:00:00Z",
        "dateEnd": "2020-03-21T13:00:00Z",
        "group": null
       },
       {
        "pk": 3,
        "name": "event2",
        "eventType": 3,
        "dateStart": "2020-03-21T12:00:00Z",
        "dateEnd": "2020-04-10T13:00:00Z",
        "group": null
       },
       {
        "pk": 4,
        "name": "event3",
        "eventType": 2,
        "dateStart": "2020-03-30T12:00:00Z",
        "dateEnd": "2020-04-10T13:00:00Z",
        "group": null
       },
    ])

  */
  getEventsBetweenDates(dateTimeStart: String, dateTimeEnd: String): Promise<any> {

    let url = this.dataURL.server + this.dataURL.endpoints.events.getEventByDate;
    url += '?start=' + dateTimeStart + '&end=' + dateTimeEnd;

    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token'),
        'Content-Type': 'application/json'
      })
    };

    return new Promise<any>((p, e) => this.http.get(url, httpOption).subscribe(
      data => {
        console.log('ok');
        p(data);
      },
      (err: any) => {
        e(err);
      }
    ));
  }

  private static date2String(date: Date) {
    let year = date.getFullYear();
    let month = ('0' + (date.getMonth() + 1)).slice(-2);
    let day = ('0' + date.getDate()).slice(-2);
    return year + '-' + month + '-' + day;
  }

  getEventsForWeek() {

    if (this.weekEvents == null) {
      let today = new Date();
      let startWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 1);
      let endWeek = new Date(today.getFullYear(), today.getMonth(), today.getDate() - today.getDay() + 7);
      console.log(EventsSystemService.date2String(startWeek), EventsSystemService.date2String(endWeek));
      this.getEventsBetweenDates(EventsSystemService.date2String(startWeek), EventsSystemService.date2String(endWeek)).then(data => {
        this.weekEvents = {};
        this.daysOfWeek.forEach((day, index) => {
          let eventsDay = [];
          let date = new Date(today.getFullYear(), today.getMonth(),
            today.getDate() - today.getDay() + index + 2, 0, 0, 0);
          data.forEach(event => {

            //date without hour
            let startDate = Math.floor(Date.parse(event.dateStart) / (24 * 3600 * 1000)) * 24 * 3600 * 1000;
            //next day date without hour
            let endDate = Math.floor((Date.parse(event.dateEnd) / (24 * 3600 * 1000)) + 1) * 24 * 3600 * 1000;
            if (startDate <= date.getTime() && date.getTime() <= endDate) {
              eventsDay.push(event);
            }
          });

          this.weekEvents[day[0]] = eventsDay;
        });


        console.log(this.weekEvents);
      }).catch();
    }
    return this.weekEvents;

  }


}
