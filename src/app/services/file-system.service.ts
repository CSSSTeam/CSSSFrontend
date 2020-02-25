import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class FileSystemService {

  constructor( private http: HttpClient ) {
    
  }
}
