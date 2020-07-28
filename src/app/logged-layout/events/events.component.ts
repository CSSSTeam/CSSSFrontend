import {Component, OnInit} from '@angular/core';
import {UserService, User} from '../../services/user.service';
import {EventsSystemService} from '../../services/events-system.service';
import * as data from '../../../config.json';

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
  constructor(private userService: UserService, private eventsSystemService: EventsSystemService) {
    this.config = (data as any).default;
    this.daysOfWeek = this.config.daysOfWeek;
  }

  ngOnInit() {
    this.user = User.instance;

    if (window.innerWidth <= 1100)
      for (let i = 0; i <= 4; i++) this.eventsList[i] = false;
    else
      for (let i = 0; i <= 4; i++) this.eventsList[i] = true;

  }

  showEventsList(id) {
    if (window.innerWidth <= 1100) {
      if (this.eventsList[id] == true) {
        this.eventsList[id] = false;
        return;
      };
      for (let i = 0; i <= 4; i++) this.eventsList[i] = false;
      this.eventsList[id] = true;
    }
  }
  }

  getEvent(day) {
    this.events4Week = this.eventsSystemService.getEventsForWeek();
    return this.events4Week[day[0]];
  }
}
