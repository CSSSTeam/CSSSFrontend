import {Component, OnInit} from '@angular/core';
import {User, UserService} from '../../services/user.service';
import {EventsSystemService} from '../../services/events-system.service';
import * as data from '../../../config.json';
import {PermissionGuard, PermissionsService} from '../../services/permissions.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [UserService]
})
export class EventsComponent implements OnInit {
  config;
  user;
  daysOfWeek;
  events4Week;
  eventsList: Array<boolean>;
  permGroup = PermissionGuard.eventsAddPanelAuthGroup;

  constructor(private userService: UserService, public permissions: PermissionsService, private eventsSystemService: EventsSystemService) {
    this.config = (data as any).default;
    this.daysOfWeek = this.config.daysOfWeek;
    this.eventsList = [];
  }

  ngOnInit() {
    this.user = User.instance;

    if (window.innerWidth <= 1100) {
      for (let i = 0; i <= 4; i++) {
        this.eventsList[i] = false;
      }
    } else {
      for (let i = 0; i <= 4; i++) {
        this.eventsList[i] = true;
      }
    }

  }

  showEventsList(id) {
    if (window.innerWidth <= 1100) {
      if (this.eventsList[id] == true) {
        this.eventsList[id] = false;
        return;
      }
      for (let i = 0; i <= 4; i++) {
        this.eventsList[i] = false;
      }
      this.eventsList[id] = true;
    }
  }

  getEvent(day) {
    this.events4Week = this.eventsSystemService.getEventsForWeek();
    if (this.events4Week == undefined) {
      return undefined;
    }
    return this.events4Week[day[0]];
  }

  getTypeColor(typeId) {
    return this.eventsSystemService.getEventTypes().find(t => {
      return t.pk == typeId;
    }).color;
  }

  getStyle(subjects: any) {
    return {'background-color': '#' + this.getTypeColor(subjects.eventType)};
  }
}
