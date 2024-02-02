import { Injectable } from '@angular/core';
import { RequestService } from './request.service';
import { ActivatedRoute } from '@angular/router';
import { HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class HelperService {
  /**
   * All APIs with URL and info
   */
  jmrs_apis: any = {
    authnexa: {
      url: 'https://authnexa.netshlife.dev/api',
      name: 'AuthNexa',
      usedFor: 'Authentification and Authorisation',
      maxRequestsPerMinute: undefined,
      testurl:
        'https://authnexa.netshlife.dev:4000/api/available-check/test-connection',
      expectedResponse: '',
    },

    metalink: {
      url: 'http://10.2.2.16:3000/api',
      name: 'Metalink',
      usedFor: 'Notemeta Handler',
      maxRequestsPerMinute: undefined,
      testurl: 'http://10.2.2.16:3000/api/notemeta',
      expectedResponse: '',
    },
  };

  /**
   * This function is used to sleep the execution of the code for a given time
   *
   * @param ms
   * @returns
   */
  sleep(ms: number) {
    new Promise((resolve) => setTimeout(resolve, ms));
  }

  /**
   * This function checks if we in the Browser
   */
  isBrowser() {
    return typeof window !== 'undefined';
  }

  /**
   * This function is used to check if all APIs are online and available
   *
   * @param reqHandler
   * @returns boolean (false = not available)
   */
  checkAPIs(reqHandler: any) {
    // let allGood: boolean = true;

    // (
    //   Object.keys(_helper.jmrs_apis) as (keyof typeof _helper.jmrs_apis)[]
    // ).forEach(async (key, index) => {
    //   if (
    //     !await _helper.isUrlAvailable(
    //       _helper.jmrs_apis[key].testurl,
    //       _helper.jmrs_apis[key].expectedResponse,
    //       reqHandler
    //     )
    //   ) {
    //     allGood = false;
    //   }
    // });

    return false /* allGood */;
  }

  /**
   * This function is used to make test requests to an URL
   *
   * @param url
   * @return boolean
   */
  async isUrlAvailable(url: string, expectedResponse: string, reqHandler: any) {
    try {
      const data = await reqHandler.GET(url);

      reqHandler.handleErrors(data);

      if (data !== expectedResponse) {
        return false;
      }

      return true;
    } catch {}

    return false;
  }

  /**
   * This function is used to log usefull stuff to the console
   *
   * @param msg
   * @param type
   */
  _l(msg: string, color: string = '#bada55') {
    if (this.isDevMode()) {
      console.log(`%c${msg}`, `background: #222; color: ${color}`);
    }
  }

  /**
   * This function is used to get a random number between min and max
   *
   * @param min
   * @param max
   *
   * @returns number
   */
  getRandomNumber(min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1) + min);
  }

  /**
   * Toggle DevMode
   *
   * @returns boolean
   */
  toggleDevMode() {
    if (this.localStorage.getItem('devmode') === 'true') {
      this.localStorage.setItem('devmode', 'false');
      return false;
    }

    this.localStorage.setItem('devmode', 'true');
    return true;
  }

  /**
   * Check if DevMode is enabled
   *
   * @returns boolean
   */
  isDevMode() {
    return this.localStorage.getItem('devmode') === 'true' ? true : false;
  }

  /**
   * This function is used to set all LocalStorage functions
   */
  localStorage: any = {
    /**
     * This function is used to check if the LocalStorage is available
     *
     * @returns boolean
     */
    isAvailable: () => {
      return typeof Storage !== 'undefined';
    },

    /**
     * This function is used to set an item in the LocalStorage
     *
     * @param key
     * @param value
     */
    setItem: (key: string, value: string) => {
      if (this.localStorage.isAvailable()) localStorage.setItem(key, value);
    },

    /**
     * This function is used to get an item from the LocalStorage
     *
     * @param key
     *
     * @returns string
     */
    getItem: (key: string) => {
      if (this.localStorage.isAvailable()) return localStorage.getItem(key);
      return 'Item with key ' + key + ' does not exists!';
    },

    /**
     * This function is used to remove an item from the LocalStorage
     *
     * @param key
     */
    removeItem: (key: string) => {
      if (this.localStorage.isAvailable()) localStorage.removeItem(key);
    },

    /**
     * This function is used to clear the LocalStorage
     *
     */
    clear: () => {
      if (this.localStorage.isAvailable()) localStorage.clear();
    },
  };

  /**
   * This function is used to handle all Access token functions
   */
  handleAccessToken: any = {
    /**
     * This function is used to get the Access token from the LocalStorage
     *
     * @param token
     * @returns string
     */
    setToken: (token: string) => {
      this.localStorage.setItem('access_token', token);
    },

    /**
     * This function is used to get the Access token from the LocalStorage
     *
     * @returns string
     */
    getToken: (): string => {
      return this.localStorage.getItem('access_token') || '';
    },
  };

  /**
   * This function is used to check the loggin status of the user
   *
   * @param reqHandler
   * @returns boolean
   */
  async checkLoginStatus(reqHandler: RequestService) {
    reqHandler.setApiUri(this.jmrs_apis.authnexa.url);

    const token: string = await this.handleAccessToken.getToken();

    const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

    const isLoggedIn = await reqHandler.POST('/auth/checklogin', {}, headers);

    if (isLoggedIn.status === 200) {
      this.localStorage.setItem(
        'current_user',
        JSON.stringify(isLoggedIn.user)
      );
      return true;
    }

    return false;
  }

  /**
   * This function is used to get the current user
   *
   * @param reqHandler
   * @returns user
   */
  async getCurrentUser(reqHandler: RequestService) {
    try {
      const token = this.handleAccessToken.getToken();
      const headers = new HttpHeaders().set('Authorization', 'Bearer ' + token);

      reqHandler.setApiUri(this.jmrs_apis.authnexa.url);
      const user = await reqHandler.POST('/auth/profile', {}, headers);
      return user;
    } catch (error) {
      return error;
    }
  }

  /**
   * This function is used to redirect the webpage
   *
   * @param router
   * @param route
   */
  async redirectTo(router: any, route: string) {
    if (this.isBrowser()) {
      await router.navigate(['items'], { relativeTo: route });;
    }
  }

  /**
   * This function is used to get the baserout of an url error?errortitle=NewTitle  =>  error
   *
   * @param url
   * @return base rout of url
   */
  getBaseRout(url: string) {
    // remove all params error/systemerror?errortitle=NewTitle  =>  error/systemerror
    url = url.split('?')[0];

    // remove all params error/systemerror  =>  error
    url = url.split('/')[0];

    return url;
  }

  /**
   * This function is used to get a Parameter in the URL
   *
   * @param term
   * @returns
   */
  async searchHeroes(term: string, route: ActivatedRoute) {
    let result = '';

    route.queryParams.subscribe((params) => {
      result = params[term];
    });

    return result;
  }

  /**
   * This function converts the given item to a modal item.
   *
   * @param item
   * @returns
   */
  convertToModalData(item: { [key: string]: any }): { [key: string]: any } {
    const modalItem: { [key: string]: any } = {};

    const legalKeys = [
      {
        key: '_id',
        modalKey: 'DB ID',
      },
      {
        key: 'title',
        modalKey: 'Titel',
      },
      {
        key: 'bemerkung',
        modalKey: 'Bemerkung',
      },
      {
        key: 'komponist',
        modalKey: 'Komponist',
      },
      {
        key: 'arrangeur',
        modalKey: 'Arrangeur',
      },
      {
        key: 'verlag',
        modalKey: 'Verlag',
      },
      {
        key: 'grad',
        modalKey: 'Grad',
      },
      {
        key: 'flex',
        modalKey: 'Flex',
      },
      {
        key: 'stil',
        modalKey: 'Stil',
      },
      {
        key: 'duration',
        modalKey: 'Spieldauer',
      },
      {
        key: 'auffuehrungs_jahr',
        modalKey: 'Aufführungsjahr',
      },
      {
        key: 'digital_analog',
        modalKey: 'Digital/Analog',
      },
      {
        key: 'demo_url',
        modalKey: 'Demo URL',
      },
      {
        key: 'aufnahme_url',
        modalKey: 'Aufnahme URL',
      },
      {
        key: 'jmr_aufnahme_url',
        modalKey: 'JMR Aufnahme URL',
      },
      {
        key: 'jungmusik_fest',
        modalKey: 'Jungmusikfest',
      },
    ];

    // prüft ob der key in legalKeys enthalten ist
    // wenn ja, dann füge den key und den value in modalItem ein
    Object.keys(item).forEach((key) => {
      const legalKey = legalKeys.find((legalKey) => legalKey.key === key);
      if (legalKey) {
        if (item[key] !== '') {
          modalItem[legalKey.modalKey] = item[key];
        }
      }
    });

    return modalItem;
  }

  /**
   * This function returns the id of the given url.
   *
   * @param url
   * @returns
   */
  getIdofUrl(url: any): any {
    if (!url || url === undefined || url === '') {
      return 'error'; // Rückgabe eines Fehlers, wenn die URL nicht definiert ist
    }

    const regExp =
      /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
    const match = url.match(regExp);

    if (match && match[2].length === 11) {
      return match[2];
    } else {
      return 'error';
    }
  }
}
