import { Injectable } from '@angular/core';

const CONFIG = {
  apiUrl: 'http://localhost:3001/',
};

@Injectable()
export class AppSettings {

  constructor() {
  }

  public getApiUrl() {
    return CONFIG.apiUrl;
  }
}
