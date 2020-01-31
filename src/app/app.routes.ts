import {Routes} from '@angular/router';
import {LoginPageComponent} from './login-page/login-page.component';
import {GuardService} from './guard.service';
import {LOGGED_PAGE} from './logged-layout/logged.routes';
import {LoggedLayoutComponent} from './logged-layout/logged-layout.component';

export const APP_ROUTES: Routes = [
  {path: '', redirectTo: '/', pathMatch: 'full',},
  {path: '', component: LoggedLayoutComponent, canActivate: [GuardService], data: {title: 'Secure Views'}, children: LOGGED_PAGE},
  {path: 'login', component: LoginPageComponent, data: {title: 'Public Views'}}
];
