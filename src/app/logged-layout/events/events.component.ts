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
  }

  getEvent(day) {
    this.events4Week = this.eventsSystemService.getEventsForWeek();
    return this.events4Week[day[0]];
  }
}
