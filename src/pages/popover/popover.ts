import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

import { ChatService, ChatMessage } from "../../providers/chat-service";

/**
 * Generated class for the PopoverPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-popover',
  templateUrl: 'popover.html',
})
export class PopoverPage {
  options: any;
  result: any;
  @Output('selectedOption') messageEvent = new EventEmitter<string>();

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public viewCtrl: ViewController,
              private chatService: ChatService) {
    console.log(navParams.get('page'));
    this.options = navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  itemSelected(option: string) {
    //console.log(`selected option is ${option}`);
    //this.messageEvent.emit(option);
    let newSelectedMsg: ChatMessage = {
        messageId: Date.now().toString(),
        userId: '140000198202211138',
        userName: 'Luff',
        userAvatar: './assets/imgs/user.jpg',
        toUserId: '210000198410281948',
        time: Date.now(),
        message: option,
        status: 'success'
    };
    this.chatService.sendSpeechTextMsg(newSelectedMsg);
    this.chatService.sendChatMessage(option)
      .subscribe((msg:any) => {
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'Hancock',
            userAvatar: './assets/imgs/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.response.result.fulfillment.speech,
            status: 'pending'
        };
        this.chatService.sendMsg(newMsg)
        .then(() => {
        })
      });
    this.viewCtrl.dismiss();
  }

}
