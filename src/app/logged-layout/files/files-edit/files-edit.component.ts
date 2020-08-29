import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../../services/support.service';
import { FileSystemService } from '../../../services/file-system.service';

@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html',
  styleUrls: ['./files-edit.component.css']
})
export class FilesEditComponent implements OnInit {

  fileName;

  constructor(
    private supportService: SupportService,
    private fileService: FileSystemService
  ) { }

  ngOnInit(): void {
  }

  addFile(fileName) {
    this.supportService.popup("wysyłanie <br> pliku", 'success');
    this.fileService.fileStatus(fileName);
  }

}
