import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../../config.json';
import {saveAs} from 'file-saver';
import {UtilsService} from './utils.service';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private dataURL;
  private typesOfFile = new Array<TypeOfFile>();
  private files: any;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    this.getTypesOfFiles();
  }

  public Files() {
    if (this.files == null) {
      this.listFile();
      return null;
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

        this.sendChunks(file, data, n);
      },
      e => {
        console.error(e);
      }
    );

  }

  private getUploadId(file: File, httpOption, name) {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.addFile;
    let formData: FormData = new FormData();

    let end = Math.min(file.size, 100000);

    const chunk = file.slice(0, end, file.type);
    formData.append('the_file', chunk, name);

    return this.http.post(url, formData, httpOption);
  }

  async sendChunks(file, uploadingData, name) {
    const offset = uploadingData['offset'];
    if (offset >= file.size) {
      this.endUploadFile(file, uploadingData['upload_id']);
      return;
    }
    const end = Math.min(2 * offset, file.size);

    const chunk: File = file.slice(offset, end, file.type);
    this.sendChunk(chunk, uploadingData['upload_id'], offset, end - 1, file.size, name).subscribe(data => {
      this.sendChunks(file, data, name);
    });
  }


  private endUploadFile(file, uploadId) {
    UtilsService.computeChecksumMd5(file).then(md5 => {
      let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.addFileComplete;

      const httpOption = {
        headers: new HttpHeaders({
          'Authorization': 'token ' + localStorage.getItem('token')
        })
      };
      let formData: FormData = new FormData();
      formData.append('upload_id', uploadId);
      formData.append('md5', md5);

      this.http.post(url, formData, httpOption).subscribe(data => {
        console.log(data);
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

  public downloadFile(name: string, src: string): Promise<any> {
    console.log(src);
    let url = this.dataURL.server + 'uploaded_files/' + src;
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

  getDetails(id: number): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.detailsFile;
    url = url.replace(':fileId', id.toString());
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
    this.http.post(url, {'name': name}, httpOption).subscribe(
      (data: any) => {
        this.Types().push(new TypeOfFile(data.pk, data.name));
      },
      (error: any) => {
        console.error(error);
      });
  }

  deleteType(id: number): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.deleteType;
    url = url.replace(':typeId', id.toString());
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

  deleteFile(id: number): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.fileSystem.deleteFile;
    url = url.replace(':fileId', id.toString());
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
}

class TypeOfFile {
  constructor(pk: number, name: string) {
    this.id = pk;
    this.name = name;
  }

  id: number;
  name: string;

}
