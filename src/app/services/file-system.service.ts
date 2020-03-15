import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../../config.json';
import {saveAs} from 'file-saver';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {
  private dataURL;
  private typesOfFile = new Array<TypeOfFile>();

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    this.getTypesOfFiles();
  }

  public types(): Array<TypeOfFile> {
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

  public uploadFile(name, description, type, file: File): Promise<any> {
    var url = this.dataURL.server + this.dataURL.endpoints.fileSystem.addFile;
    let formData: FormData = new FormData();

    formData.append('name', name);
    formData.append('description', description);
    formData.append('fileType', type);
    formData.append('upload', file);
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };

    return new Promise<any>((p, e) => this.http.post(url, formData, httpOption).subscribe(
      (data: any) => {

        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  public listFile(): Promise<any> {
    const url = this.dataURL.server + this.dataURL.endpoints.fileSystem.listFile;
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

  public downloadFile(src: string): Promise<any> {
    const url = this.dataURL.server + src.slice(14);

    //console.log("ok");
    return new Promise<any>((p, e) => this.http.get(url, {responseType: 'blob'}).subscribe(
      (data: any) => {
        console.log(data);

        saveAs(data, 'plik.asd');
        p(data);
      },
      (error: any) => {
        console.log(e);
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