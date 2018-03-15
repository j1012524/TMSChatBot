import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavParams, App } from 'ionic-angular';
import { Events, Content, TextInput } from 'ionic-angular';
import { PopoverController } from 'ionic-angular';
import { ToastController  } from 'ionic-angular';
import { SpeechRecognition } from '@ionic-native/speech-recognition';
import {  NgZone } from '@angular/core';
import { ChatService, ChatMessage, UserInfo } from "../../providers/chat-service";
import { UserService } from "../../providers/user-service";
import { PopoverPage } from '../popover/popover';
import { MapPage } from '../map/map';

@IonicPage()
@Component({
    selector: 'page-chat',
    templateUrl: 'chat.html',
})
export class Chat {

    @ViewChild(Content) content: Content;
    @ViewChild('chat_input') messageInput: TextInput;

    msgList: ChatMessage[] = [];
    user: UserInfo;
    toUser: UserInfo;
    editorMsg = '';
    showEmojiPicker = false;
    isListening: boolean = false;
    matches: Array<String>;
    userRole: String = '';

    constructor(navParams: NavParams,
                private chatService: ChatService,
                private events: Events,
                public appCtrl: App,
                private speech: SpeechRecognition,
                private zone: NgZone,
                public toastCtrl: ToastController,
                public popoverCtrl: PopoverController,
                public userService: UserService) {
        // Get the navParams toUserId parameter
        this.toUser = {
            id: navParams.get('toUserId'),
            name: navParams.get('toUserName')
        };

        //Get mock user information
        this.chatService.getUserInfo()
        .then((res) => {
            this.user = res;
        });
    }

    ionViewWillLeave() {
        // unsubscribe
        this.events.unsubscribe('chat:received');
    }

    ionViewDidEnter() {
        // Subscribe to received  new message events
        this.events.subscribe('chat:received', msg => {
            this.pushNewMsg(msg);
            this.msgList = this.chatService.getAllMessages();
        })
    }

    onFocus() {
        this.showEmojiPicker = false;
        this.content.resize();
        this.scrollToBottom();
    }

    switchEmojiPicker() {
        this.showEmojiPicker = !this.showEmojiPicker;
        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }
        this.content.resize();
        this.scrollToBottom();
    }

    sendMsg() {
        if (!this.editorMsg.trim()) return;

        // // Mock message
        const id = Date.now().toString();
        let newMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: this.user.id,
            userName: this.user.name,
            userAvatar: this.user.avatar,
            toUserId: this.toUser.id,
            time: Date.now(),
            message: this.editorMsg,
            status: 'pending'
        };

        this.pushNewMsg(newMsg);

        if (!this.showEmojiPicker) {
            this.messageInput.setFocus();
        }

        this.chatService.sendChatMessage(this.editorMsg)
          .subscribe((msg:any) => {
            let newMsg: ChatMessage = {
                messageId: Date.now().toString(),
                userId: this.user.id,
                userName: this.user.name,
                userAvatar: this.user.avatar,
                toUserId: this.toUser.id,
                time: Date.now(),
                message: msg.response.result.fulfillment.speech,
                status: 'pending'
            };
            this.chatService.sendMsg(newMsg)
            .then(() => {
                let index = this.chatService.getMsgIndexById(id);
                if (index !== -1) {
                    this.chatService.updateStatusMessage(index, 'success');
                }
            })
            console.log(`Respone: ${msg}`);
          });

        this.editorMsg = '';
    }

    receiveMessage($event: string) {
      console.log(`Event is ${event}`);
      this.editorMsg = $event;
      this.sendMsg();
    }

    pushNewMsg(msg: ChatMessage) {
        const userId = this.user.id,
              toUserId = this.toUser.id;
        // Verify user relationships
        if (msg.userId === userId && msg.toUserId === toUserId) {
            this.chatService.addMessage(msg);
        } else if (msg.toUserId === userId && msg.userId === toUserId) {
            this.chatService.addMessage(msg);
        }
        this.scrollToBottom();
    }

    scrollToBottom() {
        setTimeout(() => {
            if (this.content.scrollToBottom) {
                this.content.scrollToBottom();
            }
        }, 400)
    }

    async hasPermission():Promise<boolean> {
      try {
        const permission = await this.speech.hasPermission();
        console.log(permission);

        return permission;
      } catch(e) {
        console.log(e);
      }
    }

    async getPermission():Promise<void> {
      try {
        this.speech.requestPermission();
      } catch(e) {
        console.log(e);
      }
    }

    listen(myEvent): void {
      console.log('listen action triggered');
      this.speech.hasPermission()
        .then((hasPermission: boolean) => {
          console.log(hasPermission);
          if(!hasPermission) {
            this.speech.requestPermission()
                .then(
                  () => console.log('Granted'),
                  () => console.log('Denied')
                )
          }
        })
      if (this.isListening) {
        this.speech.stopListening();
        this.toggleListenMode();
        return;
      }

      this.presentToast('listening...');

      this.toggleListenMode();
      let this_new = this;

      this.speech.startListening()
        .subscribe(matches => {
          this_new.zone.run(() => {
            this_new.matches = matches;
            let popover = this.popoverCtrl.create(PopoverPage, {page: matches});
            popover.present({
              ev: myEvent
            });
          })
        }, error => console.log(error));
    }

    toggleListenMode():void {
      this.isListening = this.isListening ? false : true;
      console.log('listening mode is now : ' + this.isListening);
    }

    presentToast(message) {
	    let toast = this.toastCtrl.create({
	      message: message,
	      position : "middle",
        duration: 3000
	    });
	    toast.present();
	  }

    backToUser() {
      this.userService.setUserRoleType('');
      this.chatService.clearChatMessageList();
      this.appCtrl.getRootNav().popToRoot();
    }

    mapsPage(location) {
      console.log(location);
      this.appCtrl.getRootNav().push(MapPage, {loc:location});
    }
}
