import { Component, OnInit } from '@angular/core';
import { SupportService } from '../../services/support.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [
    {
      name: 'Gluten Morawski'
    },
    {
      name: 'Zbigniewa Dowbormirkowska'
    },
    {
      name: 'Eleozola Kupmizozola'
    },
    {
      name: 'Dobrawa Dobrawarszawa'
    },
    {
      name: 'Ajspik Inglisz'
    },
    {
      name: 'Iś Spresiedojcz'
    }
  ];

  constructor(public supportService: SupportService) { }

  ngOnInit(): void {
  }

  addUser() {
    this.supportService.popup('dodano użytkownika');
  }

  deleteUser() {
    this.supportService.statement('usunąć użytkownika', 'usunięto użytkownika')
  }

}
