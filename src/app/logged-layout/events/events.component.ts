import { Component, OnInit } from '@angular/core';
import {UserService, User} from '../../services/user.service';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css'],
  providers: [UserService]
})
export class EventsComponent implements OnInit{

  user;

  constructor(private userService: UserService) {

  }

  ngOnInit() {

    this.user = User.instance;
    
  }

 
  monSubjects = [
    {subject: 'matematyka', type: 'test'},
    {subject: 'religia', type: 'smallTest'},
    {subject: 'SO', type: 'test'},
  ];

}
