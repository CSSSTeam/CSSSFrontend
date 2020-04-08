import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {EventsSystemService} from '../../services/events-system.service';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})
export class EventsDetailsComponent implements OnInit {

  event;


  constructor(private route: ActivatedRoute, private eventsSystemService: EventsSystemService) {
  }

  ngOnInit() {
    let idStr = this.route.snapshot.paramMap.get('id');
    let id = Number.parseInt(idStr);

    this.eventsSystemService.getEventDetails(id).then(
      data => {
        console.log(data);
        this.event = data;
      }
    ).catch();


  }

  getNameType(eventType: number) {
    var a = this.eventsSystemService.getEventTypesAtId(eventType);
    console.log(a);
    return a.name;
  }
}
