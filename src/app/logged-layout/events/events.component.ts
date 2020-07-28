import { Component, OnInit } from '@angular/core';
import { UserService, User } from '../../services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [UserService]
})
export class EventsComponent implements OnInit {

  user;
  eventsList = [];

  constructor(private userService: UserService) {

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

  monSubjects = [
    { subject: 'matematyka', type: 'test' },
    { subject: 'religia', type: 'smallTest' },
    { subject: 'SO', type: 'test' },
  ];

  tueSubjects = [
    { subject: 'matematyka', type: 'test' },
    { subject: 'religia', type: 'smallTest' },
    { subject: 'SO', type: 'test' },
  ];

  wedSubjects = [
    { subject: 'matematyka', type: 'test' },
    { subject: 'religia', type: 'smallTest' },
    { subject: 'SO', type: 'test' },
  ];

  thuSubjects = [
    { subject: 'matematyka', type: 'test' },
    { subject: 'religia', type: 'smallTest' },
    { subject: 'SO', type: 'test' },
  ];

  friSubjects = [
    { subject: 'matematyka', type: 'test' },
    { subject: 'religia', type: 'smallTest' },
    { subject: 'SO', type: 'test' },
  ];

}
