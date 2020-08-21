import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../../services/support.service';

@Component({
  selector: 'app-infos-edit',
  templateUrl: './infos-edit.component.html',
  styleUrls: ['./infos-edit.component.css']
})
export class InfosEditComponent implements OnInit {

  constructor(private supportService: SupportService) { }

  ngOnInit(): void {
  }

  addInfo() {
    this.supportService.popup("pomyślnie <br> dodano wpis", 'success');
  }

}
