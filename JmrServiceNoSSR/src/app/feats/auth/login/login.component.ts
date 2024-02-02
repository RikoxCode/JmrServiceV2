import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { RequestService } from '../../../shared/core/request.service';
import { HelperService } from '../../../shared/core/helper.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    RouterLink,
    RouterOutlet,
    RouterLinkActive,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  providers: [RequestService, HelperService, ToastrService],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  show: boolean = true;

  isLoggedIn: boolean = true;

  isBrowser: boolean = false;

  constructor(
    private reqHandler: RequestService,
    private toastr: ToastrService,
    private helper: HelperService
  ) {}

  checkInputs(event: any) {
    if (event.target.id === 'login-card-username-input') {
      this.username = event.target.value;
    } else if (event.target.id === 'login-card-password-input') {
      this.password = event.target.value;
    }

    console.log(event.target.id);
    console.log(this.username + ' ' + this.password);

    this.show =
      this.username !== '' ? (this.password !== '' ? false : true) : true;
  }

  async login() {
    if (this.username != '' && this.password != '') {
      try {
        this.reqHandler.setApiUri(this.helper.jmrs_apis.authnexa.url);

        const data: any = await this.reqHandler.POST('/auth/login', {
          username: this.username,
          password: this.password,
        });

        this.reqHandler.handleErrors(data);

        this.helper.handleAccessToken.setToken(data.access_token);

        this.toastr.success('You are logged in as ' + this.username, 'Logged in!', {
          timeOut: 3000,
        });

        this.changeURL('profile');
      } catch (error: any) {
        this.toastr.error(error, 'Error', {
          timeOut: 6000,
          tapToDismiss: true,
        });
      }
    }
  }

  changeURL(direction: string) {
    this.helper.redirectTo(Router, direction);
  }
}
