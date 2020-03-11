import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [FileSystemService]
})
export class FilesComponent implements OnInit {

  addingFileForm: any;

  constructor(public fileSystemService: FileSystemService) {
  }

  onFileChanged(event) {
    this.addingFileForm.upload = event.target.files[0];
  }

  ngOnInit() {
    this.addingFileForm = {
      name: '',
      description: '',
      type: 0,
      upload: File = null
    };
  }

  uploadFile() {

    this.fileSystemService.uploadFile(this.addingFileForm.name, this.addingFileForm.description, this.addingFileForm.type, this.addingFileForm.upload).then(() => {
      console.log('ok');
    }).catch(e => {
      console.error(e);
    });
  }

  getTypes() {

    return this.fileSystemService.types();
  }
}
