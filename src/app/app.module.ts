import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {LoginPageComponent} from './login-page/login-page.component';
import {MainPageComponent} from './logged-layout/main-page/main-page.component';
import {LoggedLayoutComponent} from './logged-layout/logged-layout.component';
import {APP_ROUTES} from './app.routes';
import {GuardService} from './services/guard.service';
import {UserService} from './services/user.service';
import {EventsComponent} from './logged-layout/events/events.component';
import {LessonsComponent} from './logged-layout/lessons/lessons.component';
import {FilesComponent} from './logged-layout/files/files.component';
import {InfosComponent} from './logged-layout/infos/infos.component';
import {OthersComponent} from './logged-layout/others/others.component';
import {LessonsEditComponent} from './logged-layout/lessons/lessons-edit/lessons-edit.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FileDetailsComponent} from './logged-layout/file-datails/file-details.component';
import {RedactorsPanelComponent} from './logged-layout/redactors-panel/redactors-panel.component';
import {EventsDetailsComponent} from './logged-layout/events-details/events-details.component';
import {UserPanelComponent} from './logged-layout/user-panel/user-panel.component';
import { EventsEditComponent } from './logged-layout/events/events-edit/events-edit.component';
import { ChgPasswordComponent } from './logged-layout/chg-password/chg-password.component';
import { AboutComponent } from './logged-layout/about/about.component';
import { InfosEditComponent } from './logged-layout/infos/infos-edit/infos-edit.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginPageComponent,
    MainPageComponent,
    LoggedLayoutComponent,
    EventsComponent,
    LessonsComponent,
    FilesComponent,
    InfosComponent,
    OthersComponent,
    FileDetailsComponent,
    EventsEditComponent,
    ChgPasswordComponent,
    AboutComponent,
    InfosEditComponent
    RedactorsPanelComponent,
    EventsDetailsComponent,
    UserPanelComponent,
    LessonsEditComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production})
  ],
  providers: [UserService, GuardService],
  bootstrap: [AppComponent]
})
export class AppModule {
}


