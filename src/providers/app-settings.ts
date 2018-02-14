import { Injectable } from '@angular/core';

const CONFIG = {
  //apiUrl: 'http://localhost:3001/',
  apiUrl: 'https://floating-plains-26551.herokuapp.com/'
};

@Injectable()
export class AppSettings {

  constructor() {
  }

  public getApiUrl() {
    return CONFIG.apiUrl;
  }
}
