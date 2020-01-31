import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {UserService, User} from '../../user.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css'],
  providers: [UserService]
})
export class MainPageComponent implements OnInit {

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
  tueSubjects = [
    {subject: 'matematyka', type: 'test'},
    {subject: 'religia', type: 'smallTest'},
    {subject: 'SO', type: 'test'},
  ];
  wedSubjects = [
    {subject: 'matematyka', type: 'test'},
    {subject: 'religia', type: 'smallTest'},
    {subject: 'SO', type: 'test'},
  ];
  thuSubjects = [
    {subject: 'matematyka', type: 'test'},
    {subject: 'religia', type: 'smallTest'},
    {subject: 'SO', type: 'test'},
  ];
  friSubjects = [
    {subject: 'matematyka', type: 'test'},
    {subject: 'religia', type: 'smallTest'},
    {subject: 'SO', type: 'test'},
  ];
  
}
