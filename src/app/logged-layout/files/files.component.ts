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
  addingFileForm: any;
  addingTypeForm: any;
  searchText: string;
  isSearchBox = false;
  searchedFile: Array<any>;
  files = [
    {
      name: 'tablica mat',
      description: 'Tablica wartości funkcji trygonometrycznych dla poszczególnych kątów',
      date: '20.03.2020'
    },
    {
      name: 'biol-zadanie',
      description: 'Zadanie domowe dla chętnych z biologii ( termin do piątku 20III20 )',
      date: '26.03.2020'
    },
    {
      name: 'afryka',
      description: 'Zadanie z informatyki: sformatuj tekst jak najdokładniej potrafisz',
      date: '22.03.2020'
    },
    {
      name: 'tablica mat',
      description: 'Tablica wartości funkcji trygonometrycznych dla poszczególnych kątów',
      date: '20.03.2020'
    },
    {
      name: 'biol-zadanie',
      description: 'Zadanie domowe dla chętnych z biologii ( termin do piątku 20III20 )',
      date: '26.03.2020'
    },
    {
      name: 'afryka',
      description: 'Zadanie z informatyki: sformatuj tekst jak najdokładniej potrafisz',
      date: '22.03.2020'
    },
    {
      name: 'tablica mat',
      description: 'Tablica wartości funkcji trygonometrycznych dla poszczególnych kątów',
      date: '20.03.2020'
    },
    {
      name: 'biol-zadanie',
      description: 'Zadanie domowe dla chętnych z biologii ( termin do piątku 20III20 )',
      date: '26.03.2020'
    },
    {
      name: 'afryka',
      description: 'Zadanie z informatyki: sformatuj tekst jak najdokładniej potrafisz',
      date: '22.03.2020'
    },
    {
      name: 'tablica mat',
      description: 'Tablica wartości funkcji trygonometrycznych dla poszczególnych kątów',
      date: '20.03.2020'
    },
    {
      name: 'wok-referat',
      description: 'Zadanie domowe dla chętnych z biologii ( termin do piątku 20III20 )',
      date: '26.03.2020'
    },
    {
      name: 'afryka',
      description: 'Zadanie z informatyki: sformatuj tekst jak najdokładniej potrafisz',
      date: '22.03.2020'
    },
  ];

  constructor(public fileSystemService: FileSystemService) {
  }

  searchBox() {
    this.isSearchBox = !this.isSearchBox;
  }

  showFileMgmt() {
    if (this.isFileMgmtOpen == false) {
      this.isFileMgmtOpen = true;
      document.querySelector('#tab').className = 'icon-cancel open';
    } else {
      this.isFileMgmtOpen = false;
      document.querySelector('#tab').className = 'icon-down-open open';
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
    return [{
      name: 'matematyka',
      id: 1
    }, {
      name: 'polski',
      id: 2
    }]; //this.fileSystemService.Types();
  }

  getFiles() {
    if (this.searchedFile != null) {
      return this.searchedFile;
    }
    return this.fileSystemService.getFiles();
  }

  downloadFile(name: string, src: string) {
    let filename = src.replace(/^.*[\\\/]/, '');
    console.log(src);

    this.fileSystemService.downloadFile(name, filename).then(() => console.log('OK'));
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
