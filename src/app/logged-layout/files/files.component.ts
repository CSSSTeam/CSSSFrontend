import {Component, OnInit} from '@angular/core';
import {FileSystemService} from '../../services/file-system.service';
import {SupportService} from '../../services/support.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [
    FileSystemService,
    SupportService
  ]
})
export class FilesComponent implements OnInit {

  isFileMgmtOpen = false;
  isTypeElOpen = [];
  typeFiles = [];
  addingFileForm: any;
  addingTypeForm: any;
  searchText: string;
  searchedFile: Array<any>;
  mainFilesList: boolean;
  allfiles: any;

  constructor(public fileSystemService: FileSystemService, public supportService: SupportService) {

  }

  search() {
    if (!this.mainFilesList) {
      this.typeFiles = this.getFiles();
      this.allfiles = true;
    }
  }

  allFiles() {
    if (this.mainFilesList) {
      this.allfiles = true;
    } else {
      this.allfiles = !this.allfiles;
    }
    this.typeFiles = this.getFiles();
  }

  openTypeEl(id) {
    this.allfiles = false;
    this.isTypeElOpen[id] = this.isTypeElOpen[id] != true;
    this.typeFiles = this.getFilesByType(id);
  }

  showFiles() {
    return this.typeFiles;
  }

  ngOnInit() {
    this.addingTypeForm = {
      name: ''
    };
    this.typeFiles = this.getFiles();

    this.mainFilesList = window.innerWidth >= 1020;
  }

  getTypes() {
    return this.fileSystemService.Types();
    //return this.types;
  }

  getFiles() {
    if (this.searchedFile != null) {
      return this.searchedFile;
    }
    return this.fileSystemService.getFiles();
  }

  downloadFile(name: string, src: string) {
    console.log(src);
    this.fileSystemService.downloadFile(name, src).then(() => console.log('OK'));
  }

  createTypeFile() {
    this.fileSystemService.createTypeFile(this.addingTypeForm.name);
  }

  deleteType(id) {
    this.fileSystemService.deleteType(id).then(() => {
      console.log('delete Type');
    }).catch(e => {
      console.error(e);
    });
  }

  searchFile() {
    this.typeFiles = [];
    this.getFiles().forEach(e => {
      if (e.name.includes(this.searchText)) {
        this.typeFiles.push(e);
      }
    });
    return this.typeFiles;
  }

  deleteFile(id: number) {
    this.supportService.statement('usunąć plik', () => {
      this.fileSystemService.deleteFile(id).then(() =>
        this.supportService.popup('usunięto plik')).catch(e => console.error(e));
    });
  }

  getFilesByType(id) {
    let a = this.getFiles().filter(f => f.fileType == id);
    console.log(this.getFiles(), id, a);
    return a;
  }
}
