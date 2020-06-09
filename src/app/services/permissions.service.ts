import {User} from './user.service';
import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PermissionsService {

  constructor() {
  }

  hasPerm(user: Array<Group>): boolean {
    let groups = User.instance.groups;
    let isPremised = false;
    groups.forEach(g => {
      if (user.includes(PermissionsService.str2EnumGroup(g.name))) {

        isPremised = true;
      }
    });

    return isPremised;
  }

  private static str2EnumGroup(name: string): Group {
    return Group[name.toLowerCase()];
  }
}

export enum Group {
  student,
  treasurer,
  president,
  vicePresident,
  moderator,
  admin
}
