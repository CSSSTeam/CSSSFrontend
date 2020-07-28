import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';
import { SupportService } from '../../services/support.service';
import { Router } from '@angular/router';
import { stringify } from 'querystring';
import { types } from 'util';

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

  types = [
    { name: 'matematyka', id: 0 },
    { name: 'język polski', id: 1 },
    { name: 'biologia', id: 2 },
    { name: 'język angielski', id: 3 },
    { name: 'język niemiecki', id: 4 },
    { name: 'fizyka', id: 5 },
    { name: 'WOS', id: 6 },
    { name: 'chemia', id: 7 },
    { name: 'religia', id: 8 }
  ]

  files = [
    {
      name: 'pingwin',
      type: 'biologia',
      typeid: 2,
      id: 0
    },
    {
      name: 'irregular verbs',
      type: 'j. angielski',
      typeid: 3,
      id: 1
    },
    {
      name: 'zmartwychwstanie',
      type: 'religia',
      typeid: 8,
      id: 2
    },
    {
      name: 'prawa człowieka',
      type: 'wos',
      typeid: 6,
      id: 3
    },
    {
      name: 'tridiploidany',
      type: 'chemia',
      typeid: 7,
      id: 4
    },
    {
      name: 'krzyż pański',
      type: 'religia',
      typeid: 8,
      id: 5
    },
    {
      name: 'serce żaby',
      type: 'biologia',
      typeid: 2,
      id: 6
    },
    {
      name: 'idiomy',
      type: 'j. polski',
      typeid: 1,
      id: 7
    },
    {
      name: 'conditionals',
      type: 'j. angielski',
      typeid: 3,
      id: 8
    },
    {
      name: 'władza sądownicza',
      type: 'wos',
      typeid: 6,
      id: 9
    },
    {
      name: 'węglowodory',
      type: 'chemia',
      typeid: 7,
      id: 10
    },
    {
      name: 'prawo pitagorasa',
      type: 'matematyka',
      typeid: 0,
      id: 11
    },
    {
      name: 'szekspir',
      type: 'j. polski',
      typeid: 1,
      id: 12
    },
    {
      name: 'słońce',
      type: 'fizyka',
      typeid: 5,
      id: 13
    },
    {
      name: 'gwiazdy',
      type: 'fizyka',
      typeid: 5,
      id: 14
    },
    {
      name: 'prosta krzywa',
      type: 'matematyka',
      typeid: 0,
      id: 15
    },
    {
      name: 'groß',
      type: 'j. niemiecki',
      typeid: 4,
      id: 16
    },
    {
      name: 'klein',
      type: 'j. niemiecki',
      typeid: 4,
      id: 17
    }
  ]

  constructor(
    public fileSystemService: FileSystemService,
    public supportService: SupportService
  ) {

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
      for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
      this.typeFiles = this.getFiles();
      this.allfiles = true;
    }
  }

  allFiles() {
    if (!this.mainFilesList) {
      for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
      this.typeFiles = this.getFiles();
      this.allfiles = !this.allfiles;
    } else {
      this.typeFiles = this.getFiles();
    }
  }

  openTypeEl(id) {
    this.allfiles = false;
    const temp = this.subjects[id];
    for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
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

    for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
  }

  uploadFile() {

    this.fileSystemService.uploadFile(this.addingFileForm.name, this.addingFileForm.description, this.addingFileForm.type, this.addingFileForm.upload).then(() => {
      console.log('ok');
    }).catch(e => {
      console.error(e);
    });
  }

  getTypes() {
    //return this.fileSystemService.Types();
    return this.types;
  }

  getFiles() {
    /* if (this.searchedFile != null) {
      return this.searchedFile;
    }
    return this.fileSystemService.Files(); */
    return this.files;
  }

  downloadFile(name: string, src: string) {
    //console.log(src);
    //this.fileSystemService.downloadFile(name, src).then(() => console.log('OK'));
    alert('działa?');
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

} 
