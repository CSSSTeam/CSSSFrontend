import {Routes} from '@angular/router';
import {MainPageComponent} from './main-page/main-page.component';
import {EventsComponent} from './events/events.component';
import {LessonsComponent} from './lessons/lessons.component';
import {FilesComponent} from './files/files.component';
import {InfosComponent} from './infos/infos.component';
import {OthersComponent} from './others/others.component';
import {OpEditComponent} from './op-edit/op-edit.component';


export const LOGGED_PAGE: Routes = [
  {path: '', component: MainPageComponent},
  {path: 'events', component: EventsComponent},
  {path: 'lessons', component: LessonsComponent},
  {path: 'files', component: FilesComponent},
  {path: 'infos', component: InfosComponent},
  {path: 'others', component: OthersComponent},
  {path: 'edit', component: OpEditComponent}
];
