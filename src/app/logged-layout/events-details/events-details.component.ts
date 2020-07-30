import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {EventsSystemService} from '../../services/events-system.service';

@Component({
  selector: 'app-events-details',
  templateUrl: './events-details.component.html',
  styleUrls: ['./events-details.component.css']
})

//TODO(n2one):remove this Component and code move to new in events
export class EventsDetailsComponent implements OnInit {

  event;


  constructor(protected router: Router, private route: ActivatedRoute, private eventsSystemService: EventsSystemService) {
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
    return a.name;
  }

  deleteEvent() {
    this.eventsSystemService.deleteEvent(this.event.pk).then(() => {
      this.router.navigate(['/events']);
    }).catch();
  }
}
