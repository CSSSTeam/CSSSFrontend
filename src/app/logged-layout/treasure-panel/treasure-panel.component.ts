import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';
//import { tick } from '@angular/core/testing';
//import { ConsoleReporter } from 'jasmine';

@Component({
  selector: 'app-treasure-panel',
  templateUrl: './treasure-panel.component.html',
  styleUrls: ['./treasure-panel.component.css']
})
export class TreasurePanelComponent implements OnInit {

  students = [
    {
      name: 'Mirosław Krzemień',
      jourNum: 1
    },
    {
      name: 'Barbara Wilczyjadka',
      jourNum: 2
    },
    {
      name: 'Bartłomiej Dobrzemiej',
      jourNum: 3
    },
    {
      name: 'Jacek Bestaczek',
      jourNum: 4
    },
    {
      name: 'Jadwiga Mordobijka',
      jourNum: 5
    }
  ];
  lists = [
    {
      name: 'zakończenie roku',
    },
    {
      name: 'wycieczka w góry'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    },
    {
      name: 'dzień kobiet'
    }
  ];
  isChecked = [];
  isAllChecked = false;
  editUser = false;
  counter = 0;

  constructor(public supportService: SupportService) {
    this.students.forEach((e, i) => {
      this.isChecked[i] = false;
    });
  }

  ngOnInit(): void {
  }

  checkAll() {
    if (!this.isAllChecked) {
      this.students.forEach((e, i) => this.isChecked[i] = true);
      this.isAllChecked = true;
    }
    else {
      this.students.forEach((e, i) => this.isChecked[i] = false);
      this.isAllChecked = false;
      this.editUser = false;
    }
  }

  checkStudent(index) {
    this.isChecked[index] == true ? this.isChecked[index] = false : this.isChecked[index] = true
    this.isChecked.forEach(e => {
      if (e == true) this.counter++;
    })
    if (this.counter == 1) this.editUser = true;
    else this.editUser = false;
    this.counter = 0;
  }

  editOneUser() {
    this.isChecked.forEach((e, i) => {
      if (e == true) alert(this.students[i].name);
    });
  }

  addList() {
    this.supportService.popup('pomyślnie <br> dodano listę', 'success');
  }

  deleteList() {
    this.supportService.statement('usunąć listę', 'pomyślnie <br> usunięto listę');
  }

}
