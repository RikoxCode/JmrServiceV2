import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { RequestService } from '../../../shared/core/request.service';
import { HelperService } from '../../../shared/core/helper.service';

@Component({
  selector: 'app-archive-tool-site',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './archive-tool-site.component.html',
  styleUrl: './archive-tool-site.component.scss',
  providers: [HelperService, RequestService],
})
export class ArchiveToolSiteComponent {
  itemID: string = '';

  itemData: any = {
    _archiveplace: 149,
    _id: "unknown",
    arrangeur: "Michael Jackson",
    auffuerungs_jahr: "2024",
    aufnahme_url: "",
    bemerkungen: "",
    createdAt: "2024-01-15T15:53:57.045Z",
    demo_url: "",
    digital_analog: "Analog",
    duration: "2'",
    flex: "1",
    grad: "1",
    group: "JMR",
    jmr_aufnahme_url: "",
    jungmusik_fest: "2024",
    komponist: "Ryan McMahon, Ben Berger",
    stil: "Pop/Rock",
    title: "Komisches Lied",
    updatedAt: "2024-01-15T15:53:57.045Z",
    verlag: "Hall Leonard"
  };

  isRequested: boolean = false;

  constructor(
    private request: RequestService,
    private route: ActivatedRoute,
    private helper: HelperService
  ) {}

  async ngOnInit() {
    await this.getDetails();
  }

  async getDetails() {
    this.isRequested = false;

    this.itemID = await this.helper.searchHeroes('id', this.route);
    this.helper.toggleDevMode();
    this.helper._l(this.itemID);

    const response = await this.request.GET(`/notemeta/${this.itemID}`);
    console.log(response);

    this.itemData = response.data;

    this.isRequested = true;
  }
}
