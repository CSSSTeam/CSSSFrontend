import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';
import { SupportService } from '../../services/support.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
//import { types } from 'util';
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
  subjects = [];
  allfiles: boolean = false;

  constructor(public fileSystemService: FileSystemService, public supportService: SupportService) {
  }

  showFileMgmt() {
    if (this.isFileMgmtOpen == false) {
      this.isFileMgmtOpen = true;
      document.querySelector('#openMgmt').className = 'icon-cancel open';
    } else {
      this.isFileMgmtOpen = false;
      document.querySelector('#openMgmt').className = 'icon-down-open open';
    }
  }

  search() {
    if (!this.mainFilesList) {
      // for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
      this.typeFiles = this.getFiles();
      this.allfiles = true;
    }
  }

  allFiles() {
    if (!this.mainFilesList) {
      // for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
      this.typeFiles = this.getFiles();
      this.allfiles = !this.allfiles;
    } else {
      this.typeFiles = this.getFiles();
    }
  }

  openTypeEl(id) {
    this.allfiles = false;
    const temp = this.subjects[id];
    // for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
    this.subjects[id] = !temp;
    if (this.isTypeElOpen[id] != true) {
      this.isTypeElOpen[id] = true;
    } else {
      this.isTypeElOpen[id] = false;
    }
    this.typeFiles = [];
    this.showFiles(id);
  }

  showFiles(id) {
    this.getFiles().forEach(e => {
      if (e.typeid == id) this.typeFiles.push(e);
    });
    return this.typeFiles;
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
    this.typeFiles = this.getFiles();

    if (window.innerWidth >= 1020) this.mainFilesList = true;
    else this.mainFilesList = false;

    // for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
  }

  uploadFile() {

    this.fileSystemService.uploadFile(this.addingFileForm.name,
      this.addingFileForm.description, this.addingFileForm.type, this.addingFileForm.upload);
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

  deleteType(id: number) {
    /* this.fileSystemService.deleteType(id).then(() => {
      console.log('delete Type');
    }).catch(e => {
      console.error(e);
    }); */
    alert('deleted type');
  }

  searchFile() {
    /* if (this.searchText == '') {
      this.searchedFile = null;
      return;
    }
    this.fileSystemService.searchFile(this.searchText).then(data => {
      this.searchedFile = data;
    }).catch(e => {
      console.error(e);
    }); */
    this.typeFiles = [];
    this.getFiles().forEach(e => {
      if (e.name.includes(this.searchText)) this.typeFiles.push(e);
    });
    return this.typeFiles;
  }

  deleteFile(pk: number) {
    /* this.fileSystemService.deleteFile(pk).then(() => {
      console.log('deleted File');
    }).catch(e => {
      console.error(e);
    }); */

    this.supportService.statement('usunąć plik', 'usunięto plik');
  }

  getFilesByType(id: number) {
    let a = this.getFiles().filter(f => f.fileType == id);
    console.log(this.getFiles(), id, a);
    return a;
  }
}
