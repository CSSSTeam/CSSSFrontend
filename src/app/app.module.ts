import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {RouterModule} from '@angular/router';

import {AppComponent} from './app.component';
import {FormsModule} from '@angular/forms';
import {HTTP_INTERCEPTORS, HttpClientModule, HttpClientXsrfModule} from '@angular/common/http';
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
import {EventsEditComponent} from './logged-layout/events/events-edit/events-edit.component';
import {UserManagementPanelComponent} from './logged-layout/user-management-panel/user-management-panel.component';

import {Injectable} from '@angular/core';
import {
  HttpInterceptor, HttpXsrfTokenExtractor, HttpRequest, HttpHandler,
  HttpEvent
} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class HttpXsrfInterceptor implements HttpInterceptor {

  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let requestMethod: string = req.method;
    requestMethod = requestMethod.toLowerCase();

    if (requestMethod && (requestMethod === 'post' || requestMethod === 'delete' || requestMethod === 'put')) {
      const headerName = 'X-XSRF-TOKEN';
      let token = this.tokenExtractor.getToken() as string;
      if (token !== null && !req.headers.has(headerName)) {
        req = req.clone({headers: req.headers.set(headerName, token)});
      }
    }

    return next.handle(req);
  }
}

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
    RedactorsPanelComponent,
    EventsDetailsComponent,
    UserPanelComponent,
    LessonsEditComponent,
    EventsEditComponent,
    UserManagementPanelComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    ServiceWorkerModule.register('ngsw-worker.js', {enabled: environment.production}),
    HttpClientXsrfModule.withOptions({
      cookieName: 'XSRF-TOKEN',
      headerName: 'X-CSRF-TOKEN'
    })
  ],
  providers: [UserService, GuardService, {provide: HTTP_INTERCEPTORS, useClass: HttpXsrfInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule {
}




