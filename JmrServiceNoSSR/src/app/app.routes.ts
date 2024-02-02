import { Routes } from '@angular/router';
import { HomeComponent } from './feats/home/home.component';
import { LoginComponent } from './feats/auth/login/login.component';
import { ProfileComponent } from './feats/auth/profile/profile.component';
import { RegistrationComponent } from './feats/auth/registration/registration.component';
import { ArchiveComponent } from './feats/archive/archive.component';
import { PwResetComponent } from './feats/auth/pw-reset/pw-reset.component';
import { EmailincommingComponent } from './feats/email/emailincomming/emailincomming.component';
import { TestingEmailComponent } from './feats/email/testing-email/testing-email.component';
import { PagenotfoundComponent } from './feats/errors/pagenotfound/pagenotfound.component';
import { ArchiveToolSiteComponent } from './feats/archive/archive-tool-site/archive-tool-site.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'profile',
    component: ProfileComponent,
  },
  {
    path: 'registration',
    component: RegistrationComponent,
  },
  {
    path: 'archive',
    component: ArchiveComponent,
  },
  {
    path: 'pw-reset/:token',
    pathMatch: 'prefix',
    component: PwResetComponent,
  },
  {
    path: 'pw-request-email',
    component: EmailincommingComponent,
  },
  {
    path: 'testing-mail/:email',
    component: TestingEmailComponent,
  },
  {
    path: 'detailed-item',
    pathMatch: 'full',
    component: ArchiveToolSiteComponent,
  },
  {
    path: '**',
    component: PagenotfoundComponent,
  },
];