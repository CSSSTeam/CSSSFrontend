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
  subjects = [];
  allfiles: boolean = false;

  constructor(public fileSystemService: FileSystemService, public supportService: SupportService) {
  }

  search() {
    if (!this.mainFilesList) {
      //for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
      //TODO(n2one): do search files
      this.typeFiles = this.getFiles();
      this.allfiles = true;
    }
  }

  allFiles() {
    if (!this.mainFilesList) {
      //for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
      //TODO(n2one): do all file
      this.typeFiles = this.getFiles();
      this.allfiles = !this.allfiles;
    } else {
      this.typeFiles = this.getFiles();
    }
  }

  openTypeEl(id) {
    this.allfiles = false;
    const temp = this.subjects[id];
    //for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
    //TODO(n2one):types v2
    this.subjects[id] = !temp;
    this.isTypeElOpen[id] = this.isTypeElOpen[id] != true;
    this.typeFiles = [];
    this.showFiles(id);
  }

  showFiles(id) {
    this.getFiles().forEach(e => {
      if (e.typeid == id) {
        this.typeFiles.push(e);
      }
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

    this.mainFilesList = window.innerWidth >= 1020;

    //for (let i = 0; i < this.types.length; i++) this.subjects[i] = false;
    //TODO(n2one): types
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
      if (e.name.includes(this.searchText)) {
        this.typeFiles.push(e);
      }
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
