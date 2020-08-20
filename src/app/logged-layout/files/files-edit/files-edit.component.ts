import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../../services/support.service';

@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html',
  styleUrls: ['./files-edit.component.css']
})
export class FilesEditComponent implements OnInit {

  constructor(private supportService: SupportService) { }

  ngOnInit(): void {
  }

  addFile() {
    this.supportService.popup("pomyślnie <br> dodano plik", 'success');
  }

}
