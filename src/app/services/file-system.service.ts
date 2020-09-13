import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../../config.json';
import {saveAs} from 'file-saver';
import {UtilsService} from './utils.service';
import {interval} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private dataURL;
  private typesOfFile = new Array<TypeOfFile>();
  private files: any;
  private uploadingFileList: Array<any>;
  private MAX_CHUNK: number = 10 * 1024 * 1024;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    this.getTypesOfFiles();
    this.uploadingFileList = [];
    this.files = null;
    let intervalReloadEvents = 500;
    interval(intervalReloadEvents).subscribe(() => {
      this.updateUploadingBars();
    });
  }

  public getFiles() {
    if (this.files == null) {
      this.listFile();
      return [];
    }
    return this.files;
  }

  public Types(): Array<TypeOfFile> {
    if (this.typesOfFile == null) {
      this.getTypesOfFiles();
      return null;
    }
    return this.typesOfFile;
  }

  private getTypesOfFiles() {
    const url = this.dataURL.server + this.dataURL.endpoints.fileSystem.getTypes;
    const httpOption = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    this.http.get(url, httpOption).subscribe(
      (data: any) => {
        for (var type of data) {
          this.typesOfFile.push(new TypeOfFile(type.pk, type.name));
        }
      }
    );
  }

  public async uploadFile(name, description, type, file: File) {

    let n = name + '.' + UtilsService.getFileExtension(file.name);

    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token'),
        'Content-Disposition': 'attachment; filename="' + n + '"'
      })
    };

    this.getUploadId(file, httpOption, n).subscribe(data => {
        this.uploadingFileList.push({
          upload_id: data['upload_id'],
          name: name,
          description: description,
          type: type,
          progress: 0
        });
        this.fileStatus(data['upload_id']);

        this.sendChunks(file, data, n, description, type, name);
      },
      e => {
        console.error(e);
      }
    );

  }

  private getUploadId(file: File, httpOption, name) {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.addFile;
    let formData: FormData = new FormData();

    let end = Math.min(file.size, this.MAX_CHUNK);

    const chunk = file.slice(0, end, file.type);
    formData.append('the_file', chunk, name);

    return this.http.post(url, formData, httpOption);
  }

  async sendChunks(file, uploadingData, nameWithExtension, description, type, name) {
    const offset = uploadingData['offset'];
    if (offset >= file.size) {
      this.uploadingFileList.filter(f => {
        return f.upload_id == uploadingData['upload_id'];
      })[0].progress = 100;
      this.endUploadFile(file, uploadingData['upload_id'], name, description, type);

      return;
    }
    //calc progress
    this.uploadingFileList.filter(f => {
      return f.upload_id == uploadingData['upload_id'];
    })[0].progress = Math.round(offset / file.size * 100);

    const end = Math.min(offset + this.MAX_CHUNK, file.size);

    const chunk: File = file.slice(offset, end, file.type);
    this.sendChunk(chunk, uploadingData['upload_id'], offset, end - 1, file.size, nameWithExtension).subscribe(data => {
      this.sendChunks(file, data, nameWithExtension, description, type, name);
    });
  }


  private endUploadFile(file, uploadId, name, description, type) {
    UtilsService.computeChecksumMd5(file).then(md5 => {
      let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.addFileComplete;

      const httpOption = {
        headers: new HttpHeaders({
          'Authorization': 'token ' + localStorage.getItem('token')
        })
      };
      this.uploadingFileList = this.uploadingFileList.filter(u => {
        return uploadId != u.upload_id;
      });
      let formData: FormData = new FormData();
      formData.append('upload_id', uploadId);
      formData.append('md5', md5);
      formData.append('name', name);
      formData.append('description', description);
      formData.append('type', type);

      this.http.post(url, formData, httpOption).subscribe(d => {
        if (this.files != null) {
          this.files.push(d);
        }
        console.log(d);
      });
    });
  }


  sendChunk(chunk, uploadId, start, end, size, name) {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.addFile;


    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token'),
        'Content-Range': 'bytes ' + start + '-' + end + '/' + size,
        'Content-Disposition': 'attachment; filename="' + name + '"'
      })
    };

    let formData: FormData = new FormData();
    formData.append('upload_id', uploadId);
    formData.append('the_file', chunk, name);
    return this.http.post(url, formData, httpOption);
  }

  public updateFile(fileId, data) {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.updateFile;
    url = url.replace(':fileId', fileId);
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    this.http.post(url, data, httpOption).subscribe(data => {
      this.files = this.files.filter(file => file.pk != fileId);
      this.files.push(data);
      console.log(data);
    });

  }

  public listFile(): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.listFile;
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.get(url, httpOption).subscribe(
      (data: any) => {
        this.files = data;
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  public searchFile(phrase: string): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.searchFile + '?phrase=' + phrase;
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.get(url, httpOption).subscribe(
      (data: any) => {
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  public downloadFile(name: string, url: string): Promise<any> {

    return new Promise<any>((p, e) => this.http.get(url, {responseType: 'blob'}).subscribe(
      (data: any) => {
        saveAs(data, name);
        p(data);
      },
      (error: any) => {
        console.error(e);
        e(error);
      }
    ));
  }

  getDetails(id): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.detailsFile;
    url = url.replace(':fileId', id);
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.get(url, httpOption).subscribe(
      (data: any) => {
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  createTypeFile(name: string) {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.createType;

    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.post(url, {'name': name}, httpOption).subscribe(
      (data: any) => {
        this.Types().push(new TypeOfFile(data.pk, data.name));
        p(data);
      },
      (error: any) => {
        console.error(error);
        e(error);
      }));
  }

  deleteType(id): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.deleteType;
    url = url.replace(':typeId', id);
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.delete(url, httpOption).subscribe(
      (data: any) => {
        p(data);
        this.typesOfFile = this.typesOfFile.filter((v) => {
          return v.id != id;
        });
        this.files = this.files.filter((v) => {
          return v.fileType != id;
        });
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  deleteFile(id): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.deleteFile;
    url = url.replace(':fileId', id);
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.delete(url, httpOption).subscribe(
      (data: any) => {
        this.files = this.files.filter((v) => {
          return v.pk != id;
        });
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  getUploadingList() {
    return this.uploadingFileList;
  }

  buildFileStatusItemDiv(fileName) {
    return `
<div class="fileStatusItem">
  ${fileName}
  <div class="statusBar">
    <div class="innerBar"></div>
  </div>
  <i class="icon-cancel"></i>
</div>
    `;
  }

  fileStatus(upload_id) {
    const fileStatus = document.querySelector('.fileStatus');

    if (fileStatus === null) {
      const fileStatus = document.createElement('div');
      fileStatus.classList.add('fileStatus');
      fileStatus.innerHTML = this.buildFileStatusItemDiv(this.getNameByUploadId(upload_id));
      document.body.appendChild(fileStatus);
    } else {
      fileStatus.innerHTML += this.buildFileStatusItemDiv(this.getNameByUploadId(upload_id));
    }

    document.querySelectorAll('.innerBar').forEach(item => {
      item['style'].width = `${this.getProgressByUploadId(upload_id)}%`;
      item['name'] = 'bar_' + upload_id;
    });

    document.querySelectorAll('.icon-cancel').forEach(item => {
      item.addEventListener('click', () =>
        document.querySelector('.fileStatus').removeChild(item.parentNode)
      );
    });

  }

  private getObjectByUploadId(upload_id: any) {
    return this.uploadingFileList.find(f => f.upload_id == upload_id);
  }

  private getProgressByUploadId(upload_id: any) {
    let uploadingObj = this.getObjectByUploadId(upload_id);
    if (uploadingObj == undefined) {
      return undefined;
    }
    return uploadingObj['progress'];
  }

  private getNameByUploadId(upload_id: any) {
    let uploadingObj = this.getObjectByUploadId(upload_id);
    if (uploadingObj == undefined) {
      return undefined;
    }
    return uploadingObj['name'];
  }

  private updateUploadingBars() {
    document.querySelectorAll('.innerBar').forEach(item => {
      let upload_id = item['name'].split('_')[1];

      item['style'].width = `${this.getProgressByUploadId(upload_id)}%`;
    });
  }
}

class TypeOfFile {
  constructor(pk: string, name: string) {
    this.id = pk;
    this.name = name;
  }

  id: string;
  name: string;

}
