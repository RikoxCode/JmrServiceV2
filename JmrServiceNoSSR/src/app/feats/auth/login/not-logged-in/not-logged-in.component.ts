import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-not-logged-in',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ],
  templateUrl: './not-logged-in.component.html',
  styleUrl: './not-logged-in.component.scss'
})
export class NotLoggedInComponent {

}
