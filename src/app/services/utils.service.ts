import {Injectable} from '@angular/core';
import * as SparkMD5 from 'spark-md5';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor() {
  }

  public static getCookie(cname) {
    const name = cname + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    let ca = decodedCookie.split(';');
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  }

  public static blobToFile(theBlob: Blob, fileName: string): File {
    var b: any = theBlob;
    //A Blob() is almost a File() - it's just missing the two properties below which we will add
    b.lastModifiedDate = new Date();
    b.name = fileName;

    //Cast to a File() type
    return <File> theBlob;
  }

  public static computeChecksumMd5(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const chunkSize = 100000; // Read in chunks of 2MB
      const spark = new SparkMD5.ArrayBuffer();
      const fileReader = new FileReader();

      let cursor = 0; // current cursor in file

      fileReader.onerror = function(): void {
        reject('MD5 computation failed - error reading the file');
      };

      // read chunk starting at `cursor` into memory
      function processChunk(chunk_start: number): void {
        const chunk_end = Math.min(file.size, chunk_start + chunkSize);
        fileReader.readAsArrayBuffer(file.slice(chunk_start, chunk_end));
      }

      // when it's available in memory, process it
      // If using TS >= 3.6, you can use `FileReaderProgressEvent` type instead
      // of `any` for `e` variable, otherwise stick with `any`
      // See https://github.com/Microsoft/TypeScript/issues/25510
      fileReader.onload = function(e: any): void {
        spark.append(e.target.result); // Accumulate chunk to md5 computation
        cursor += chunkSize; // Move past this chunk

        if (cursor < file.size) {
          // Enqueue next chunk to be accumulated
          processChunk(cursor);
        } else {
          // Computation ended, last chunk has been processed. Return as Promise value.
          // This returns the base64 encoded md5 hash, which is what
          // Rails ActiveStorage or cloud services expect
          //resolve(btoa(spark.end(true)));

          // If you prefer the hexdigest form (looking like
          // '7cf530335b8547945f1a48880bc421b2'), replace the above line with:
          resolve(spark.end());
        }
      };

      processChunk(0);
    });
  }

}
