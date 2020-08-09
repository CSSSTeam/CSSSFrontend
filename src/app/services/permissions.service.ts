import {User} from './user.service';
import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate} from '@angular/router';


export enum Group {
  student,
  treasurer,
  president,
  vicePresident,
  moderator,
  admin
}

@Injectable({
  providedIn: 'root'
})

export class PermissionsService {

  constructor() {
  }

  hasPerm(user: Array<Group>): boolean {
    if (User.instance == undefined) {
      return false;
    }
    let groups = User.instance.groups;
    if (groups == undefined || groups.length == 0) {
      return false;
    }
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

@Injectable()
export class PermissionGuard implements CanActivate {
  public static userPanelAuthGroup = [Group.admin, Group.president, Group.vicePresident];
  public static eventsAddPanelAuthGroup = [Group.admin, Group.moderator, Group.president, Group.vicePresident];

  constructor(private permission: PermissionsService) {

  }


  canActivate(route: ActivatedRouteSnapshot) {
    return this.permission.hasPerm(route.data.groups);
  }

}
