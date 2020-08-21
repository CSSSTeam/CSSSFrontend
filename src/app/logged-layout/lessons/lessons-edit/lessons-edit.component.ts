import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../../services/support.service';

@Component({
  selector: 'app-lessons-edit',
  templateUrl: './lessons-edit.component.html',
  styleUrls: ['./lessons-edit.component.css']
})
export class LessonsEditComponent implements OnInit {

  constructor(public supportService: SupportService) { }

  ngOnInit(): void {
  }

  addLesson() {
    this.supportService.popup("pomyślnie <br> dodano lekcję", 'success');
  }

}
