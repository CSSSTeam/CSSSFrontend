import {Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {EventsComponent} from './events/events.component';
import {LessonsComponent} from './lessons/lessons.component';
import {FilesComponent} from './files/files.component';
import {InfosComponent} from './infos/infos.component';
import {OthersComponent} from './others/others.component';
import {LessonsEditComponent} from './lessons/lessons-edit/lessons-edit.component';
import {EventsEditComponent} from './events/events-edit/events-edit.component';
import {InfosEditComponent} from './infos/infos-edit/infos-edit.component';
import {FileDetailsComponent} from './file-datails/file-details.component';
import {ChgPasswordComponent} from './chg-password/chg-password.component';
import {AboutComponent} from './about/about.component';
import {RedactorsPanelComponent} from './redactors-panel/redactors-panel.component';
import {EventsDetailsComponent} from './events-details/events-details.component';

export const LOGGED_PAGE: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'events', component: EventsComponent},
  {path: 'events/:id', component: EventsDetailsComponent},
  {path: 'lessons', component: LessonsComponent},
  {path: 'files', component: FilesComponent},
  {path: 'files/:id', component: FileDetailsComponent},
  {path: 'infos', component: InfosComponent},
  {path: 'others', component: OthersComponent},
  {path: 'redactor', component: RedactorsPanelComponent},
  {path: 'lessons-edit', component: LessonsEditComponent},
  {path: 'events-edit', component: EventsEditComponent},
  {path: 'infos-edit', component: InfosEditComponent},
  {path: 'chg-password', component: ChgPasswordComponent},
  {path: 'about', component: AboutComponent}
];
