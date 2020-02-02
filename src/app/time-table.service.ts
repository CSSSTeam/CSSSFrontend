import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../config.json';

@Injectable({
  providedIn: 'root',
})
export class TimeTableService {
  private timetable;
  private dataURL;
  public daysOfWeek = [
    ['monday', 'Poniedziałek'],
    ['tuesday', 'Wtorek'],
    ['wednesday', 'Środa'],
    ['thursday', 'Czwartek'],
    ['friday', 'Piątek'],
  ];

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    this.loadTimetable();

  }

  loadTimetable() {
    const url = this.dataURL.server + this.dataURL.endpoints.timetable.get;
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    this.http.get(url, httpOption).subscribe(
      (data: any) => {
        console.log(data);
        this.timetable = data;
      },
      () => {
        //this.timetable = JSON.parse('{"type":"C","fullName":"1I2","teacherName":"Pudełko Marek","periods":[{"num":"1","start":"7:30","end":"8:15"},{"num":"2","start":"8:25","end":"9:10"},{"num":"3","start":"9:20","end":"10:05"},{"num":"4","start":"10:15","end":"11:00"},{"num":"5","start":"11:15","end":"12:00"},{"num":"6","start":"12:10","end":"12:55"},{"num":"7","start":"13:05","end":"13:50"},{"num":"8","start":"13:55","end":"14:40"},{"num":"9","start":"15:00","end":"15:45"},{"num":"10","start":"15:50","end":"16:35"}],"monday":[[{"subject":"wf","period":"1","classroom":"SG1","teacher":"CP","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"wf","period":"2","classroom":"SG1","teacher":"CP","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"hist","period":"3","classroom":"213","teacher":"KB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"fiz","period":"4","classroom":"107","teacher":"AB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"utk","period":"5","classroom":"501i","teacher":"PŁ","entireClass":false,"groupNum":1,"group":"prac1"},{"subject":"utk","period":"5","classroom":"508i","teacher":"MO","entireClass":false,"groupNum":2,"group":"prac2"},{"subject":"utk","period":"5","classroom":"6W","teacher":"PU","entireClass":false,"groupNum":3,"group":"prac3"}],[{"subject":"utk","period":"6","classroom":"501i","teacher":"PŁ","entireClass":false,"groupNum":1,"group":"prac1"},{"subject":"utk","period":"6","classroom":"508i","teacher":"MO","entireClass":false,"groupNum":2,"group":"prac2"},{"subject":"utk","period":"6","classroom":"6W","teacher":"PU","entireClass":false,"groupNum":3,"group":"prac3"}],[{"subject":"utk","period":"7","classroom":"501i","teacher":"PŁ","entireClass":false,"groupNum":1,"group":"prac1"},{"subject":"utk","period":"7","classroom":"508i","teacher":"MO","entireClass":false,"groupNum":2,"group":"prac2"},{"subject":"utk","period":"7","classroom":"6W","teacher":"PU","entireClass":false,"groupNum":3,"group":"prac3"}],[{"subject":"utk","period":"8","classroom":"501i","teacher":"PŁ","entireClass":false,"groupNum":1,"group":"prac1"},{"subject":"utk","period":"8","classroom":"508i","teacher":"MO","entireClass":false,"groupNum":2,"group":"prac2"},{"subject":"utk","period":"8","classroom":"6W","teacher":"PU","entireClass":false,"groupNum":3,"group":"prac3"}],[{"subject":"inf","period":"9","classroom":"512i","teacher":"ŚW","entireClass":false,"groupNum":1,"group":"gr1"}],[{"subject":"wf","period":"10","classroom":"SG2","teacher":"JB","entireClass":false,"groupNum":1,"group":"gr1"}]],"tuesday":[[{"subject":"wf","period":"1","classroom":"SG5","teacher":"WĘ","entireClass":false,"groupNum":3,"group":"Dz.3"}],[{"subject":"wf","period":"2","classroom":"SG5","teacher":"WĘ","entireClass":false,"groupNum":3,"group":"Dz.3"}],[{"subject":"j.pol","period":"3","classroom":"107","teacher":"SU","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"mat","period":"4","classroom":"107","teacher":"MB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"zwo","period":"5","classroom":"107","teacher":"PU","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"mat","period":"6","classroom":"105","teacher":"MB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"che","period":"7","classroom":"21J","teacher":"KE","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"biol","period":"7","classroom":"URBA","teacher":"HF","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"wok","period":"8","classroom":"205","teacher":"SU","entireClass":true,"groupNum":0,"group":"Cała klasa"}],null,null],"wednesday":[[{"subject":"inf","period":"1","classroom":"512i","teacher":"ŚW","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"wf","period":"2","classroom":"SG5","teacher":"JB","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"sys.op","period":"2","classroom":"210i","teacher":"ŁĘ","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"wf","period":"3","classroom":"SG5","teacher":"JB","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"sys.op","period":"3","classroom":"210i","teacher":"ŁĘ","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"edb","period":"4","classroom":"223","teacher":"NI","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"wf","period":"4","classroom":"SG5","teacher":"CP","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"rel","period":"5","classroom":"I218","teacher":"WB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"j.nie","period":"6","classroom":"WDŻI","teacher":"DD","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"j.nie","period":"6","classroom":"207","teacher":"SB","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"j.ang","period":"7","classroom":"21J","teacher":"CK","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"edb","period":"7","classroom":"223","teacher":"NI","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"p.przed","period":"8","classroom":"111","teacher":"WA","entireClass":true,"groupNum":0,"group":"Cała klasa"}],null,null],"thursday":[[{"subject":"wf","period":"1","classroom":"SG4","teacher":"WĘ","entireClass":false,"groupNum":3,"group":"Dz.3"}],[{"subject":"rel","period":"2","classroom":"215","teacher":"WB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"bhp","period":"3","classroom":"214","teacher":"SL","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"biol","period":"4","classroom":"I205","teacher":"HF","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"sys.op","period":"4","classroom":"210i","teacher":"ŁĘ","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"j.ang","period":"5","classroom":"21J","teacher":"CK","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"sys.op","period":"5","classroom":"210i","teacher":"ŁĘ","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"sys.op","period":"6","classroom":"210i","teacher":"ŁĘ","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"j.ang","period":"6","classroom":"I205","teacher":"PR","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"sys.op","period":"7","classroom":"210i","teacher":"ŁĘ","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"j.ang","period":"7","classroom":"211","teacher":"PR","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"geo","period":"8","classroom":"110","teacher":"DM","entireClass":true,"groupNum":0,"group":"Cała klasa"}],null,null],"friday":[[{"subject":"sys.op","period":"1","classroom":"510i","teacher":"ŁĘ","entireClass":false,"groupNum":1,"group":"gr1"}],[{"subject":"sys.op","period":"2","classroom":"510i","teacher":"ŁĘ","entireClass":false,"groupNum":1,"group":"gr1"},{"subject":"che","period":"2","classroom":"21J","teacher":"KE","entireClass":false,"groupNum":2,"group":"gr2"}],[{"subject":"j.pol","period":"3","classroom":"211","teacher":"SU","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"j.pol","period":"4","classroom":"211","teacher":"SU","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"mat","period":"5","classroom":"105","teacher":"MB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"wos","period":"6","classroom":"112","teacher":"KB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],[{"subject":"hist","period":"7","classroom":"105","teacher":"KB","entireClass":true,"groupNum":0,"group":"Cała klasa"}],null,null,null]}');
      }
    );
  }

  getTimetable() {
    return this.timetable;
  }
}
