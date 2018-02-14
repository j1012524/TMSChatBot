import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { SpeechRecognition } from '@ionic-native/speech-recognition';

import { MyApp } from './app.component';
import { EmojiProvider } from '../providers/emoji';
import { AppSettings } from '../providers/app-settings';
import { HttpClientModule } from "@angular/common/http";
import { InterceptorModule } from '../providers/interceptor.module';
//import { PopoverPage } from '../pages/chat/PopoverPage';
import { ChatModule } from '../pages/chat/chat.module';
import { PopoverPageModule } from '../pages/popover/popover.module';

@NgModule({
  declarations: [
    MyApp,
    //PopoverPage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    ChatModule,
    PopoverPageModule,
    IonicModule.forRoot(MyApp, {
      tabsHideOnSubPages:true,
      tabsLayout:'icon-left',
      preloadModules: true
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    //PopoverPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    AppSettings,
    InterceptorModule,
    EmojiProvider,
    SpeechRecognition
  ]
})
export class AppModule {}
