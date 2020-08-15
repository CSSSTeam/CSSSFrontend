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

  colorValue;

  constructor(private supportService: SupportService) { }
  }

  getTypes() {
    return this.eventsSystemService.getEventTypes();
  }

  addType() {
    this.eventsSystemService.addType(this.addTypeForm).then().catch();
  }

  addEvent() {
    if (this.addEventForm.name == '' || this.addEventForm.name == undefined) {
      this.supportService.popup('Wydarzenie musi mieć nazwe');
      return;
    }
    if (this.addEventForm.dateStart > this.addEventForm.dateEnd) {
      this.supportService.popup('Wydarzenie musi mieć puźniej konic niż początek');
      return;
    }

    if (this.addEventForm.dateStart < Date.now()) {
      this.supportService.popup('Wydarzenie musi mieć odnosić się do przyszłości');
      return;
    }
    if (this.addEventForm.description == '' || this.addEventForm.description == undefined) {
      this.supportService.popup('Wydarzenie musi mieć opis');
      return;
    }
    this.eventsSystemService.addEvent(this.addEventForm).then(() => {
      this.addedEvent = true;
      this.supportService.popup('dodano wydarzenie');
    }).catch(e => {
      console.error(e);
      this.supportService.popup('nie udało się dodać nowego wydarzenia');
    });
  }
}
