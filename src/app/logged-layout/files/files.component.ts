import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [ FileSystemService ]
})
export class FilesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
