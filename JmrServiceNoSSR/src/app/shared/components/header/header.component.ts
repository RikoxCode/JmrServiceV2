import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestService } from '../../core/request.service';
import { HelperService } from '../../core/helper.service';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    CommonModule,
    HttpClientModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
  providers: [RequestService, HttpClient],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;
  usernameFirstLetter: string = 'A';

  helper: HelperService;

  constructor(private ReqHandler: RequestService) {
    this.helper = new HelperService();
  }

  async ngOnInit() {
    this.isLoggedIn = await this.helper.checkLoginStatus(this.ReqHandler);

    this.usernameFirstLetter = 'A';
  }

  async getFirstLetterOfUsername() {
    let username: string = (await this.helper.getCurrentUser(this.ReqHandler))
      .username;
    if (typeof username !== 'string') {
      this.usernameFirstLetter = 'A';
      return;
    }
    this.usernameFirstLetter = username.split('')[0].toLocaleUpperCase();
  }
}
