import {Component, OnInit} from '@angular/core';
import {FileSystemService} from '../../services/file-system.service';

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


  constructor(public fileSystemService: FileSystemService) {
  }

  searchBox() {
    this.isSearchBox = !this.isSearchBox;
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
    let a = this.getFiles().filter(f => f.fileType == id);
    console.log(this.getFiles(), id, a);
    return a;
  }
}
