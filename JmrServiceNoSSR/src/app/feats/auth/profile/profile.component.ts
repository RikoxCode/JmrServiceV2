import { Component } from '@angular/core';
import { RequestService } from '../../../shared/core/request.service';
import { HelperService } from '../../../shared/core/helper.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss',
  providers: [RequestService, HelperService]
})
export class ProfileComponent {
  profileInfos: any = {};

  usernameFirstLetter: string = 'A';
  motivierenderSpruch: string = '';

  img_assets: any = [
    "assets/profile/profile_1.jpeg",
    "assets/profile/profile_2.jpeg",
    "assets/profile/profile_3.jpeg",
    "assets/profile/profile_4.jpeg",
  ]

  motivierendeSprueche: string[] = [
    "Sei der Wandel, den du in der Welt sehen möchtest. - Mahatma Gandhi",
    "Die einzige Möglichkeit, großartige Arbeit zu leisten, besteht darin, diese zu lieben, was du tust. - Steve Jobs",
    "Erfolg ist nicht final, Misserfolg ist nicht fatal: Was zählt, ist der Mut weiterzumachen. - Winston Churchill",
    "Träume groß, arbeite hart, bleibe bescheiden.",
    "Dein einziger Wettbewerber sollte das gestrige Selbst sein.",
    "Glaube an dich selbst und alles ist möglich.",
    "Die beste Zeit für einen Neuanfang ist jetzt.",
    "Erfolg kommt von innen heraus.",
    "Wenn du denkst, dass du zu klein bist, um etwas zu verändern, versuche mal zu schlafen, wenn eine Mücke im Raum ist. - Dalai Lama",
    "Die Zukunft gehört denen, die an die Schönheit ihrer Träume glauben. - Eleanor Roosevelt"
  ];


  constructor(
    private ReqHandler: RequestService,
    private helper: HelperService
    ) {}

  async ngOnInit() {
    await this.getProfile();
    await this.getFirstLetterOfUsername();
    await this.getMotivierendenSpruch();
  }

  getImgAsset(index: number = 2340978623) {
    if(index === 2340978623) {
      return this.img_assets[this.helper.getRandomNumber(0, this.img_assets.length - 1)]
    }
    return this.img_assets[index]
  }

  async getFirstLetterOfUsername() {
    let username: string = (await this.helper.getCurrentUser(this.ReqHandler)).username;
    if(typeof username !== 'string'){
      this.usernameFirstLetter = 'A';
      return;
    }
    this.usernameFirstLetter = username.split('')[0];
  }

  async getMotivierendenSpruch() {
    this.motivierenderSpruch = this.motivierendeSprueche[this.helper.getRandomNumber(0, this.motivierendeSprueche.length - 1)]
  }

  async getProfile() {
    let user: any = await this.helper.getCurrentUser(this.ReqHandler);
    this.profileInfos = user;
  }

  logout() {
    this.helper.localStorage.removeItem('access_token');
    this.helper.localStorage.removeItem('current_user');
    window.location.pathname = '/';
  }
}
