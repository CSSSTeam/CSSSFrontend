import { Component, OnInit } from '@angular/core';
import { FileSystemService } from '../../services/file-system.service';

@Component({
  selector: 'app-files',
  templateUrl: './files.component.html',
  styleUrls: ['./files.component.css'],
  providers: [FileSystemService]
})
export class FilesComponent implements OnInit {

  isFileMgmtOpen = false;
  isTypeElOpen = [];
  addingFileForm: any;
  addingTypeForm: any;
  searchText: string;
  isSearchBox = false;
  searchedFile: Array<any>;

  types = [
    { name: 'matematyka', id: 0 },
    { name: 'j. polski', id: 1 },
    { name: 'biologia', id: 2 },
    { name: 'j. angielski', id: 3 },
    { name: 'j. niemiecki', id: 4 },
    { name: 'fizyka', id: 5 },
    { name: 'wos', id: 6 },
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

  constructor(public fileSystemService: FileSystemService) {
  }

  searchBox() {
    this.isSearchBox = !this.isSearchBox;
    for (let type of this.types) {
      this.isTypeElOpen[type.id] = false;
    }
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

  openTypeEl(id) {
    if (this.isTypeElOpen[id] == false) {
      this.isTypeElOpen[id] = true;
      document.querySelector('#tab' + id).className = 'icon-cancel open';
    } else {
      this.isTypeElOpen[id] = false;
      document.querySelector('#tab' + id).className = 'icon-down-open open';
    }
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

  getFilesByType(id: number) {
    return this.getFiles().filter(f => f.id = id);
  }
}
