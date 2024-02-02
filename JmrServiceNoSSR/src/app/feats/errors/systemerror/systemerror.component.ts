import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { HelperService } from '../../../shared/core/helper.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-systemerror',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterOutlet,
    RouterLinkActive
  ],
  templateUrl: './systemerror.component.html',
  styleUrl: './systemerror.component.scss'
})
export class SystemerrorComponent {

  message: string = "An error ecoured!";
  code: string = "404"
  title: string = "Error"

  btn_src: string = "/"

  constructor(
    private route: ActivatedRoute,
    private helper: HelperService
  ){ }

  async ngOnInit(){
    await this.getDetails()
  }

  async getDetails(){
    this.message = await this.helper.searchHeroes('errormessage', this.route)
    this.code = await this.helper.searchHeroes('errorcode', this.route)
    this.title = await this.helper.searchHeroes('errortitle', this.route)
    this.btn_src = await this.helper.searchHeroes('redirecturl', this.route)
  }
}
