import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import * as data from '../config.json';

@Injectable({
  providedIn: 'root'
})
export class BasicInfoService {
  private dataURL;
  private date;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
    let url = this.dataURL.server + this.dataURL.endpoints.date;
    this.http.get(url).subscribe(
      (data: any) => {
        this.date = new Date(data.month + ' ' + data.day + ',' + data.year + ' ' + data.hour + ':' + data.minute + ':' + data.second);
      },
      (e: any) => {
        this.date = new Date();
      }
    );
  }

  public getDate(): string | undefined {
    if (this.date == undefined) {
      return undefined;
    }

    return this.date.getDate() + '.' + (this.date.getMonth() + 1) + '.' + this.date.getFullYear();
  }
}
