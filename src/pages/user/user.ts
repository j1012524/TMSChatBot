import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, App } from 'ionic-angular';

//import { TabsPage } from '../tabs/tabs';
import { Chat } from '../chat/chat';
import { UserService } from "../../providers/user-service";


@IonicPage()
@Component({
  selector: 'page-user',
  templateUrl: 'user.html',
})
export class UserPage {

  toUser : {toUserId: string, toUserName: string};
  fromUser : {fromUserId: string, fromUserName: string};

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public appCtrl: App,
              public userService: UserService) {
      this.toUser = {
        toUserId:'210000198410281948',
        toUserName:'Optimus'
      }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad UserPage');
  }

  nextPage(event, userType) {
    //this.appCtrl.getRootNav().push(TabsPage, {event, userType});
    let sessionID = Math.floor((Math.random() * 10000000) + 1).toString();
    this.userService.setUserRoleType(userType);
    this.userService.setUserSessionId(sessionID);
    this.appCtrl.getRootNav().push(Chat, this.toUser);
  }

}
