import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PopoverPage } from './popover';

@NgModule({
  declarations: [
    PopoverPage,
  ],
  entryComponents: [
    PopoverPage
  ],
  imports: [
    IonicPageModule.forChild(PopoverPage),
  ],
  exports: [
    PopoverPage
  ],
  providers:[
  ]
})
export class PopoverPageModule {}
