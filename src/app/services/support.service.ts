import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SupportService {

  constructor() {
  }

  imgW;

  scrollDown(fromTop: number, timeout: number) {
    window.setTimeout(function() {
      window.scroll({
        top: fromTop,
        behavior: 'smooth'
      });
    }, timeout);
  }

  scrollUp() {
    window.scroll(0, 0);
  }

  popup(text, ok = true) {
    let exists = false;
    const popup = document.createElement('div');
    if (window.innerWidth >= 1350) {
      this.imgW = 150;
    } else {
      this.imgW = 80;
    }
    popup.classList.add('popup');
    if (ok) {
      popup.innerHTML = '<div><img src="../assets/img/success.png" width="' + this.imgW + '"/><br> pomyślnie <br>' + text + '</div>';
    } else {
      popup.innerHTML = '<div><img src="../assets/img/error.png" width="' + this.imgW + '"/><br> ERROR <br>' + text + '</div>';
    }
    document.body.appendChild(popup);
    popup.addEventListener('click', () => {
      document.body.removeChild(popup);
      exists = true;
    });

    setTimeout(() => {
      if (!exists)
        document.body.removeChild(popup);
    }, 1500);
  }

  statement(text, yesCallBack, backCallBack = (() => null)) {
    const statement = document.createElement('div');
    statement.innerHTML = `
<div id="box">
  <p>Czy na pewno chcesz ${text}?</p>
  <div>
    <button class="yes">Tak</button>
    <button class="back">Cofnij</button>
  </div>
</div>
    `;
    // statement.innerHTML = '<div id="box"><p>Czy na pewno chcesz ' + text + '?</p><div><button class="yes">Tak</button><button class="back">Cofnij</button></div></div>';

    statement.classList.add('statement');
    document.body.appendChild(statement);

    const yes = document.querySelector('.yes');
    const back = document.querySelector('.back');
    yes.addEventListener('click', () => {
      document.body.removeChild(statement);
      yesCallBack();
    });
    back.addEventListener('click', () => {
      document.body.removeChild(statement);
      backCallBack();
    });
  }

}
