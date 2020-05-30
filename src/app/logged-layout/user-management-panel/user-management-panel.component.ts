import {Component, OnInit} from '@angular/core';
import {UserManagementService} from '../../services/user-management.service';

@Component({
  selector: 'app-user-management-panel',
  templateUrl: './user-management-panel.component.html',
  styleUrls: ['./user-management-panel.component.css']
})
export class UserManagementPanelComponent implements OnInit {
  hasNetwork = true;

  users: any;
  newUserForm: any;
  userList: any;

  constructor(private userManagementService: UserManagementService) {
  }

  onFileChanged(event) {
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (d) => {
        UserManagementPanelComponent.loadFile(d, this);
      };
      reader.onerror = function() {
        console.log('error reading file');
      };
    }
  }

  ngOnInit() {
    this.newUserForm = {
      username: '',
      password: ''
    };
  }

  getUsers() {
    return this.userManagementService.getListUser();
  }

  createUser() {
    return this.userManagementService.createUsers([this.newUserForm]);
  }

  deleteUser(pk: number) {
    this.userManagementService.deleteUser(pk).then().catch();
  }

  createUserFromFile() {
    this.userList = this.userList.map(d => {
      d.password = this.generateRandomPassword(5);
      return d;
    });
    this.userList = this.userList.map(d => {
      d.groups = d.groups.map(a => {
        return {pk: a};
      });
      return d;
    });


    this.userManagementService.createUsers(this.userList).catch(e => {
      console.error(e);
    });
  }

  private static loadFile(evt, mainFunc) {
    mainFunc.setUserList(JSON.parse(evt.target['result']));
  }

  generateRandomPassword(pwdLen: number) {
    var pwdChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    return Array(pwdLen).fill(pwdChars).map(x => x[Math.floor(Math.random() * x.length)]).join('');
  }

  getGroupsList(groups) {
    return groups.map(gr => {
      return this.userManagementService.getGroupById(gr);
    });
  }

  public setUserList(parse: any) {
    this.userList = parse;
  }
}
