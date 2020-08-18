import {Component, OnInit} from '@angular/core';
import {SupportService} from '../../../services/support.service';
import {FileSystemService} from '../../../services/file-system.service';

@Component({
  selector: 'app-files-edit',
  templateUrl: './files-edit.component.html',
  styleUrls: ['./files-edit.component.css']
})
export class FilesEditComponent implements OnInit {
  public addingFileForm: any;

  constructor(public fileSystemService: FileSystemService, private supportService: SupportService) {
  }

  ngOnInit(): void {
    this.addingFileForm = {
      name: '',
      description: '',
      type: -1,
      upload: File = null
    };
  }

  onFileChanged(event) {
    this.addingFileForm.upload = event.target.files[0];
  }

  getTypes() {
    return this.fileSystemService.Types();
  }

  uploadFile() {

    if (this.addingFileForm.name == undefined || this.addingFileForm.name == '') {
      this.supportService.popup('Plik musi mieć nazwe', false);
      return;
    }
    if (this.addingFileForm.description == undefined || this.addingFileForm.description == '') {
      this.supportService.popup('Plik musi mieć opis', false);
      return;
    }
    if (this.addingFileForm.type == -1) {
      this.supportService.popup('Plik musi mieć typ', false);
      return;
    }
    if (this.addingFileForm.upload == null) {
      this.supportService.popup('Musisz wysłać jakić plik', false);
      return;
    }
    this.fileSystemService.uploadFile(this.addingFileForm.name,
      this.addingFileForm.description, this.addingFileForm.type, this.addingFileForm.upload);
    this.supportService.popup('dodano plik');
  }

}
