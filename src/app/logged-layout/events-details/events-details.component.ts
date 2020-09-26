import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsSystemService} from '../../services/events-system.service';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {

  event;


  constructor(protected router: Router, private route: ActivatedRoute, private eventsSystemService: EventsSystemService) {
  }

  ngOnInit() {
    let idStr = this.route.snapshot.paramMap.get('id');

    this.eventsSystemService.getEventDetails(idStr).then(
      data => {
        this.event = data;
      }
    ).catch(() => {
      console.error('EVENT NOT FOUND');
      this.router.navigate(['/']);
    });


  }

  getNameType(eventType: number) {
    if (eventType == undefined) {
      return undefined;
    }
    var a = this.eventsSystemService.getEventTypesAtId(eventType);
    return a.name;
  }

  deleteEvent() {
    this.eventsSystemService.deleteEvent(this.event.pk).then(() => {
      this.router.navigate(['/events']);
    }).catch();
  }

  displayIfExist(obj: any, param: string) {
    if (obj == undefined) {
      return undefined;
    }
    return param in obj ? obj[param] : undefined;
  }

  displayDate(obj: any, param: string) {
    if (obj == undefined) {
      return undefined;
    }
    let d = obj[param];
    let day = d[8] + d[9];
    let month = d[5] + d[6];
    let hour = d[11] + d[12];
    let minute = d[14] + d[15];
    let year = d[0] + d[1] + d[2] + d[3];
    return day + '/' + month + '/' + year + ' ' + hour + ':' + minute;

  }
}
