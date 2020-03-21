import {Component, OnInit} from '@angular/core';
import {FileSystemService} from '../../services/file-system.service';
import {Router} from '@angular/router';
import {stringify} from 'querystring';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [FileSystemService]
})
export class FilesComponent implements OnInit {

  addingFileForm: any;
  addingTypeForm: any;
  searchText: string;
  searchedFile: Array<any>;

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
    this.addingTypeForm = {
      name: ''
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

    return this.fileSystemService.Types();
  }

  getFiles() {
    if (this.searchedFile != null) {
      return this.searchedFile;
    }
    return this.fileSystemService.Files();
  }

  downloadFile(name: string, src: string) {
    console.log(src);
    this.fileSystemService.downloadFile(name, src).then(() => console.log('OK'));
  }

  createTypeFile() {
    this.fileSystemService.createTypeFile(this.addingTypeForm.name);
  }

  deleteType(id: number) {
    this.fileSystemService.deleteType(id).then(() => {
      console.log('delete Type');
    }).catch(e => {
      console.error(e);
    });
  }

  searchFile() {
    if (this.searchText == '') {
      this.searchedFile = null;
      return;
    }
    this.fileSystemService.searchFile(this.searchText).then(data => {
      this.searchedFile = data;
    }).catch(e => {
      console.error(e);
    });
  }

  deleteFile(pk: number) {
    this.fileSystemService.deleteFile(pk).then(() => {
      console.log('deleted File');
    }).catch(e => {
      console.error(e);
    });
  }
}
