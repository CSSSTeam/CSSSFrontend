import { Component, OnInit } from '@angular/core';
import { TimeoutError } from 'rxjs';
import { SupportService } from '../../../services/support.service';

@Component({
  selector: 'app-events-edit',
  templateUrl: './events-edit.component.html',
  styleUrls: ['./events-edit.component.css']
})
export class EventsEditComponent implements OnInit {

  colorValue;

  constructor(private supportService: SupportService) { }

  ngOnInit(): void {
  }

  addEvent() {
    this.supportService.popup("dodano wydarzenie");
  }

}
