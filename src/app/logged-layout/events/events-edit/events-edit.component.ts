import {Component, OnInit} from '@angular/core';
import {SupportService} from '../../../services/support.service';
import {EventsSystemService} from '../../../services/events-system.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {
  addedEvent: any;

  addEventForm = {
    name: '',
    description: '',
    eventType: 1,
    dateStart: Date.now(),
    dateEnd: Date.now()
  };
  addTypeForm: any;

  constructor(private eventsSystemService: EventsSystemService, private supportService: SupportService) {
  }

  ngOnInit() {
    this.addEventForm = {
      name: '',
      description: '',
      eventType: 1,
      dateStart: Date.now(),
      dateEnd: Date.now()
    };
    this.addTypeForm = {
      name: ''
    };

  }

  getTypes() {
    console.log('1');
    return this.eventsSystemService.getEventTypes();
  }

  addType() {
    this.eventsSystemService.addType(this.addTypeForm).then().catch();
  }

  addEvent() {
    console.log(this.addEventForm);
    //TODO(n2one): data validation
    this.eventsSystemService.addEvent(this.addEventForm).then(() => {
      this.addedEvent = true;
      this.supportService.popup('dodano wydarzenie');
    }).catch(e => {
      console.error(e);
      this.supportService.popup('nie udało się dodać nowego wydarzenia');
    });
  }

}
