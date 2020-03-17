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
import {OpEditComponent} from './logged-layout/op-edit/op-edit.component';
import {ServiceWorkerModule} from '@angular/service-worker';
import {environment} from '../environments/environment';
import {FileDetailsComponent} from './logged-layout/file-datails/file-details.component';

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
    OpEditComponent,
    FileDetailsComponent
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


