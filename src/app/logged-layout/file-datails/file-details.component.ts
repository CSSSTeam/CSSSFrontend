import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FileSystemService} from '../../services/file-system.service';

@Component({
  selector: 'app-file-datails',
  templateUrl: './file-details.component.html',
  styleUrls: ['./file-details.component.css']
})
export class FileDetailsComponent implements OnInit {
  file;

  constructor(private route: ActivatedRoute, private fileSystemService: FileSystemService) {
  }

  ngOnInit() {
    let idStr = this.route.snapshot.paramMap.get('id');
    this.fileSystemService.getDetails(idStr).then(r => {
      this.file = r;
    }).catch(e => {
      console.error(e);
      this.file = {error: 'Undefined error'};
    });
  }

  getType(typeId) {
    let type = this.fileSystemService.Types().filter(t => {
      return t.id == typeId;
    })[0];
    console.log(typeId, this.fileSystemService.Types(), type);
    return type.name;
  }

  getDate(dateStr: string) {
    let date = new Date(dateStr);
    return `${date.getHours()}:${date.getMinutes()} ${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`;
  }

  downloadFile() {
    this.fileSystemService.downloadFile(this.file.name, this.file.upload).then(() => console.log('OK'));
  }
}
