import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

import { Chat } from '../chat/chat';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  toUser : {toUserId: string, toUserName: string};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App) {
    this.toUser = {
      toUserId:'210000198410281948',
      toUserName:'Hancock'
    }
  }

  backToUser() {
    this.appCtrl.getRootNav().pop();
  }

  chatPage(event) {
    this.appCtrl.getRootNav().push(Chat, this.toUser);
  }
}
