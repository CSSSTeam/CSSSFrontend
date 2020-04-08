import {Component, OnInit} from '@angular/core';
import {EventsSystemService} from '../../services/events-system.service';

@Component({
  selector: 'app-redactors-panel',
  templateUrl: './redactors-panel.component.html',
  styleUrls: ['./redactors-panel.component.css']
})
export class RedactorsPanelComponent implements OnInit {
  addEventForm = {
    name: '',
    description: '',
    eventType: 1,
    dateStart: Date.now(),
    dateEnd: Date.now()
  };

  constructor(private eventsSystemService: EventsSystemService) {
  }

  ngOnInit() {
    this.addEventForm = {
      name: '',
      description: '',
      eventType: 1,
      dateStart: Date.now(),
      dateEnd: Date.now()
    };

  }

  getTypes() {
    return this.eventsSystemService.getEventTypes();
  }

  addEvent() {
    console.log(this.addEventForm);
    this.eventsSystemService.addEvent(this.addEventForm).then().catch();
  }
}
