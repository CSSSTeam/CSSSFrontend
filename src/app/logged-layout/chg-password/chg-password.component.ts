import { Component, Input, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-chg-password',
  templateUrl: './chg-password.component.html',
  styleUrls: ['./chg-password.component.css']
})
export class ChgPasswordComponent implements OnInit {

  constructor(private supportService: SupportService) {

  }

  ngOnInit() {

  }

  changePassword() {
    this.supportService.popup("zmieniono hasło");
  }

}
