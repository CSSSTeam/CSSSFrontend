import {Component, OnInit} from '@angular/core';
import {SupportService} from '../../../services/support.service';
import {EventsSystemService} from '../../../services/events-system.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {

  addEventForm = {
    name: '',
    description: '',
    eventType: 1,
    dateStart: Date.now(),
    dateEnd: Date.now()
  };
  addTypeForm: any;
  delTypeForm: any;

  constructor(private eventsSystemService: EventsSystemService, private supportService: SupportService) {
  }

  ngOnInit() {
    this.addEventForm = {
      name: '',
      description: '',
      eventType: -1,
      dateStart: Date.now(),
      dateEnd: Date.now()
    };
    this.addTypeForm = {
      name: '',
      color: '#FF0000'
    };
    this.delTypeForm = {
      eventType: -1
    };

  }

  getTypes() {
    return this.eventsSystemService.getEventTypes();
  }

  addType() {
    if (this.addTypeForm.name == undefined || this.addTypeForm.name == '') {
      this.supportService.popup('Typ musi mieć nazwe', false);
      return;
    }
    this.addTypeForm.color = this.addTypeForm.color.substr(1, 6);

    this.eventsSystemService.addType(this.addTypeForm).then(() => {
      this.supportService.popup('Dodano Typ');
    }).catch(e => {
      this.supportService.popup('Coś poszło nie tak', false);
      console.error(e);
    });
  }

  addEvent() {
    if (this.addEventForm.name == '' || this.addEventForm.name == undefined) {
      this.supportService.popup('Wydarzenie musi mieć nazwe', false);
      return;
    }
    if (this.addEventForm.dateStart > this.addEventForm.dateEnd) {
      this.supportService.popup('Wydarzenie musi mieć puźniej konic niż początek', false);
      return;
    }

    if (this.addEventForm.dateStart < Date.now()) {
      this.supportService.popup('Wydarzenie musi mieć odnosić się do przyszłości', false);
      return;
    }
    if (this.addEventForm.description == '' || this.addEventForm.description == undefined) {
      this.supportService.popup('Wydarzenie musi mieć opis', false);
      return;
    }
    this.eventsSystemService.addEvent(this.addEventForm).then(() => {
      this.supportService.popup('dodano wydarzenie');
    }).catch(e => {
      console.error(e);
      this.supportService.popup('nie udało się dodać nowego wydarzenia', false);
    });
  }

  delType() {
    this.eventsSystemService.deleteType(this.delTypeForm.eventType).then(() => {
      this.supportService.popup('USUNIĘTO');
    }).catch(e => {
      console.error(e);
      this.supportService.popup('NIe udało się usunąć typu', false);
    });
  }
}
