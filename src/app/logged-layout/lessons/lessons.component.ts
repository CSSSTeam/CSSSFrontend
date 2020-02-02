import {Component, OnInit} from '@angular/core';
import {TimeTableService} from '../../time-table.service';

@Component({
  selector: 'app-lessons',
  templateUrl: './lessons.component.html',
  styleUrls: ['./lessons.component.css'],
  providers: [TimeTableService]
})
export class LessonsComponent implements OnInit {

  constructor(private timetableService: TimeTableService) {

  }

  ngOnInit() {
  }

  displayLesson(lessonElementElement: any) {
    return lessonElementElement != null ? lessonElementElement['name'] : '';
  }
}
