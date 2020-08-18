import {Component, OnInit} from '@angular/core';
import {SupportService} from '../../services/support.service';
import {UserManagementService} from '../../services/user-management.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {


  users: any;
  newUserForm: any;
  userList: any;
  addGroupForm: any;

  constructor(private userManagementService: UserManagementService, public supportService: SupportService) {
    this.addGroupForm = {};
  }

  onFileChanged(event) {
    let file = event.target.files[0];
    if (file) {
      let reader = new FileReader();
      reader.readAsText(file, 'UTF-8');
      reader.onload = (d) => {
        UsersComponent.loadFile(d, this);
      };
      reader.onerror = function() {
        console.log('error reading file');
      };
    }
  }

  ngOnInit() {
    this.newUserForm = {
      username: '',
      groups: 0,
      password: 'asdf'
    };
  }

  getUsers() {
    return this.userManagementService.getListUser();
  }

  createUser() {

    if (this.getUsers().find(u => {
      return u.username == this.newUserForm.username;
    }) != undefined) {
      this.supportService.popup('Istnieje już użytkownik o takim loginie', false);
      return;
    }
    return this.userManagementService.createUsers(this.newUserForm).then(() => {
      this.supportService.popup('dodano użytkownika');
    }).catch(e => {
      console.log(e);
      this.supportService.popup('Nie udało się stworzyć użytkownika', false);
    });
  }

  deleteUser(pk: number) {
    this.supportService.statement('usunąć użytkownika', () => {
      this.userManagementService.deleteUser(pk).then(() => {
        this.supportService.popup('Udało się usunać plik');
      }).catch(e => {
        console.error(e);
        this.supportService.popup('Coś poszło nie tak', false);
      });
    });

  }

  createUserFromFile() {
    this.userList = this.userList.map(d => {
      d.password = this.generateRandomPassword(8);
      return d;
    });
    console.log(this.userList);

    this.userManagementService.createUsers(this.userList).then(() => {
      this.generatePasswordFile(this.userList);
    }).catch(e => {
      console.error(e);
    });
  }

  private generatePasswordFile(userlist) {

    let content = 'It\'s File with generated users';
    userlist.forEach(user => {
      content += '\nusername: ' + user.username + ' password: ' + user.password;
    });
    let file = new Blob([content]);
    saveAs(file, 'asdf.txt');

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

  getGroups() {
    return this.userManagementService.getGroups();
  }

  public setUserList(parse: any) {
    this.userList = parse;
  }

  addUser2Group(userId: number) {
    console.log(this.addGroupForm);
    if (userId in this.addGroupForm) {
      let groupId = this.addGroupForm[userId];
      console.log(groupId);
      this.userManagementService.addUser2Group(userId, groupId).then(() => {
        console.log('ok');
      }).catch();
    }
  }
}
