import { Component, OnInit } from '@angular/core';
import { HelperService } from '../../shared/core/helper.service';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{

  constructor() { }

  ngOnInit(): void {
    const helper = new HelperService();

    helper.toggleDevMode();

    helper._l('HomeComponent loaded');
  }
}
