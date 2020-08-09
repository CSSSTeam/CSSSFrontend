import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import * as data from '../../config.json';

@Injectable({
  providedIn: 'root'
})
export class UserManagementService {
  private dataURL: any;
  private users: Array<any>;
  private groups: any;
  private hasNetwork: Boolean = true;

  constructor(private http: HttpClient) {
    this.dataURL = (data as any).default;
  }

  private getListUserQuery() {
    let url = this.dataURL.server + this.dataURL.endpoints.userManager.getList;
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.get(url, httpOption).subscribe(
      (data: any) => {
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  getListUser() {

    if (this.users != null) {
      return this.users;
    }

    if (!this.hasNetwork) {
      return;
    }

    this.getListUserQuery().then(data => {
      this.users = data;

      return data;
    }).catch(e => {

      this.hasNetwork = false;
      console.error(e);
    });
  }


  createUsers(usersData): Promise<any> {
    let url = this.dataURL.server + this.dataURL.endpoints.userManager.createUser;
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    console.log(usersData);
    return new Promise<any>((p, e) => this.http.post(url, usersData, httpOption).subscribe(
      (data: any) => {
        this.users.push(data);

        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  deleteUser(id): Promise<any> {

    let url = this.dataURL.server + this.dataURL.endpoints.userManager.deleteUser;
    url = url.replace(':idUser', id.toString());
    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.delete(url, httpOption).subscribe(
      (data: any) => {

        this.users = this.users.filter((v) => {
          return v.id != id;
        });
        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }

  getGroupsQuery() {
    let url = this.dataURL.server + this.dataURL.endpoints.userManager.getGroups;

    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    this.http.get(url, httpOption).subscribe(
      (data: any) => {
        this.groups = data;
      },
      () => {
        this.hasNetwork = false;
      }
    );
  }

  getGroupById(id) {

    if (this.groups == null) {
      this.getGroupsQuery();
      return;
    }

    return this.groups.find(gr => {
      return gr.id == id;
    });
  }

  getGroups() {
    if (this.groups == null) {
      this.getGroupsQuery();
      return;
    }
    return this.groups;
  }

  addUser2Group(userId, groupId) {

    let url = this.dataURL.server + this.dataURL.endpoints.userManager.addGroup2User;
    url = url + '?user=' + userId + '&group=' + groupId;

    const httpOption = {
      headers: new HttpHeaders({
        'Authorization': 'token ' + localStorage.getItem('token')
      })
    };
    return new Promise<any>((p, e) => this.http.post(url, null, httpOption).subscribe(
      (data: any) => {
        let group = this.groups.find(g => g.id == groupId);
        this.users.find(d => d.id == userId).groups.push(group);

        p(data);
      },
      (error: any) => {
        e(error);
      }
    ));
  }
}
