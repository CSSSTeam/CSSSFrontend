import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollDown(fromTop:number, timeout:number) {
    window.setTimeout(function() {
      window.scroll({
        top: fromTop,
        behavior: 'smooth'
      })
    }, timeout);
  }

  scrollUp() {
    window.scroll(0,0);
  }

}
