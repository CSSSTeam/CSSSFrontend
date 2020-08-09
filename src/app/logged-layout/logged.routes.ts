import {Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {EventsComponent} from './events/events.component';
import {LessonsComponent} from './lessons/lessons.component';
import {FilesComponent} from './files/files.component';
import {InfosComponent} from './infos/infos.component';
import {OthersComponent} from './others/others.component';
import {LessonsEditComponent} from './lessons/lessons-edit/lessons-edit.component';
import {EventsEditComponent} from './events/events-edit/events-edit.component';
import {FilesEditComponent} from './files/files-edit/files-edit.component';
import {InfosEditComponent} from './infos/infos-edit/infos-edit.component';
import {FileDetailsComponent} from './file-datails/file-details.component';
import {ChgPasswordComponent} from './chg-password/chg-password.component';
import {TreasurePanelComponent} from './treasure-panel/treasure-panel.component';
import {UsersComponent} from './users/users.component';
import {AboutComponent} from './about/about.component';
import {PermissionGuard} from '../services/permissions.service';

export const LOGGED_PAGE: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'events', component: EventsComponent},
  {path: 'lessons', component: LessonsComponent},
  {path: 'files', component: FilesComponent},
  {path: 'files/:id', component: FileDetailsComponent},
  {path: 'infos', component: InfosComponent},
  {path: 'others', component: OthersComponent},
  {path: 'lessons-edit', component: LessonsEditComponent},
  {
    path: 'events-edit',
    component: EventsEditComponent,
    canActivate: [PermissionGuard],
    data: {groups: PermissionGuard.eventsAddPanelAuthGroup}
  },
  {path: 'files-edit', component: FilesEditComponent},
  {path: 'infos-edit', component: InfosEditComponent},
  {path: 'chg-password', component: ChgPasswordComponent},
  {path: 'treasure-panel', component: TreasurePanelComponent},
  {path: 'users', component: UsersComponent, canActivate: [PermissionGuard], data: {groups: PermissionGuard.userPanelAuthGroup}},
  {path: 'about', component: AboutComponent}
];
