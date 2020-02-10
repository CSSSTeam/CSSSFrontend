import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {

  constructor() { }

  scrollToLog() {
    window.setTimeout(function() {
      window.scroll({
        top: window.screen.height,
        behavior: 'smooth'
      })
    }, 1500);
  }

  scrollToTop() {
    window.scroll(0,0);
  }

}
