import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NotLoggedInComponent } from '../auth/login/not-logged-in/not-logged-in.component';
import { TableComponent } from './table/table.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { RequestService } from '../../shared/core/request.service';
import { HelperService } from '../../shared/core/helper.service';

@Component({
  selector: 'app-archive',
  standalone: true,
  imports: [
    CommonModule,
    NotLoggedInComponent,
    TableComponent,
    HttpClientModule
  ],
  templateUrl: './archive.component.html',
  styleUrl: './archive.component.scss',
  providers: [RequestService, HttpClient, HelperService],
})
export class ArchiveComponent implements OnInit {
  archive_items: any = [];

  isLoggedIn: boolean = false;

  isRequested: boolean = false;
  
  constructor(
    private ReqHandler: RequestService,
    private helper: HelperService
  ) {}

  async ngOnInit() {
    this.fetchArchiveItems();
    this.setLoggedInStatus();
  }

  async setLoggedInStatus() {
    this.isLoggedIn = await this.helper.checkLoginStatus(this.ReqHandler);
  }

  async fetchArchiveItems() {
    this.isRequested = false;

    let data: any = await this.ReqHandler.GET('/notemeta');

    data = this.validateArchiveItems(data);

    await this.setLoggedInStatus();

    this.archive_items = data;

    this.isRequested = true;
  }

  validateArchiveItems(items: any[]) {
    items.forEach((element) => {
      // go through each key of the element and check if it is valid
      // if not, change value to "not set"
      Object.keys(element).forEach((key) => {
        if (
          element[key] === null ||
          element[key] === undefined ||
          element[key] === 'undefiend'
        ) {
          element[key] = 'not set';
        }
        if (element[key] !== Number) {
          element[key] = element[key].toString();
        }
      });
    });

    return items;
  }
}
