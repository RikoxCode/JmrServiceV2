import { Component } from '@angular/core';
import { RequestService } from '../../../shared/core/request.service';
import { ToastrService } from 'ngx-toastr';
import { HelperService } from '../../../shared/core/helper.service';
import {
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.scss',
  providers: [RequestService, HelperService],
})
export class RegistrationComponent {
  username: string = '';
  password: string = '';
  password_check: string = '';
  email: string = '';

  show: boolean = true;

  constructor(
    private reqHandler: RequestService,
    private helper: HelperService,
    private toastr: ToastrService
  ) {}

  checkInputs(event: any) {
    if (event.target.id === 'register-card-username-input') {
      this.username = event.target.value;
    } else if (event.target.id === 'register-card-password-input') {
      this.password = event.target.value;
    } else if (event.target.id === 'register-card-email-input') {
      this.email = event.target.value;
    }

    this.show =
      this.username !== ''
        ? this.password !== ''
          ? this.email !== ''
            ? false
            : true
          : true
        : true;

    if (this.password !== this.password_check) {
      console.log('Passwords do not match!');
      this.show = true;
    }
  }

  checkPW(event: any) {
    this.password_check = event.target.value;
    this.show =
      this.username !== ''
        ? this.password !== ''
          ? this.email !== ''
            ? false
            : true
          : true
        : true;

    if (this.password !== this.password_check) {
      console.log('Passwords do not match!');
      this.show = true;
    }
  }

  async register() {
    if (this.username != '' && this.password != '' && this.email != '') {
      if (this.password === this.password_check) {
        this.reqHandler.setApiUri(this.helper.jmrs_apis.authnexa.url);

        const data: any = await this.reqHandler.POST('/auth/register', {
          username: this.username,
          email: this.email,
          password: this.password,
        });

        this.reqHandler.handleErrors(data);

        this.helper.handleAccessToken.setToken(data.access_token);

        this.toastr.success(
          'You are logged in as ' + this.username,
          'Logged in!',
          {
            timeOut: 3000,
          }
        );

        this.changeURL('profile');
      }
    }
  }

  changeURL(direction: string) {
    switch (direction) {
      case 'profile':
        // ändere den pfad auf /profile
        window.location.pathname = '/profile';
        break;
    }
  }
}
