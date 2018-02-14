import { Component, Output, EventEmitter } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

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
              public viewCtrl: ViewController) {
    console.log(navParams.get('page'));
    this.options = navParams.get('page');
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PopoverPage');
  }

  itemSelected(option: string) {
    console.log(`selected option is ${option}`);
    this.messageEvent.emit(option);
    this.viewCtrl.dismiss();
  }

}
