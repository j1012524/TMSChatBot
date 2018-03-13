import { Injectable } from '@angular/core';
import { Events } from 'ionic-angular';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import {Observable} from "rxjs/Observable";
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs/observable/of';

import { AppSettings } from './app-settings';
import { UserService } from "./user-service";

export class ChatMessage {
    messageId: string;
    userId: string;
    userName: string;
    userAvatar: string;
    toUserId: string;
    time: number | string;
    message: string;
    status: string;
}

export class UserInfo {
    id: string;
    name?: string;
    avatar?: string;
}

@Injectable()
export class ChatService {

    msgList: ChatMessage[] = [];

    constructor(private http: HttpClient,
                private events: Events,
                public appSettings: AppSettings,
                public userService: UserService) {
    }

    appUrl = this.appSettings.getApiUrl();

    mockNewMsg(msg) {
        const mockMsg: ChatMessage = {
            messageId: Date.now().toString(),
            userId: '210000198410281948',
            userName: 'OPTIMUS',
            userAvatar: './assets/imgs/to-user.jpg',
            toUserId: '140000198202211138',
            time: Date.now(),
            message: msg.message,
            status: 'success'
        };

        setTimeout(() => {
            this.events.publish('chat:received', mockMsg, Date.now())
        }, Math.random() * 1800)
    }

    addMessage(msg: ChatMessage) {
        this.msgList.push(msg);
    }

    getAllMessages() {
        return this.msgList;
    }

    clearChatMessageList() {
      this.msgList = [];
    }

    updateStatusMessage(index: number, newStatus: string) {
        this.msgList[index].status = 'success';
    }

    getMsgIndexById(id: string) {
        return this.msgList.findIndex(e => e.messageId === id)
    }

    sendMsg(msg: ChatMessage) {
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
        .then(() => this.mockNewMsg(msg));
    }

    sendSpeechTextMsg(msg: ChatMessage) {
        return new Promise(resolve => setTimeout(() => resolve(msg), Math.random() * 1000))
        .then(() => this.events.publish('chat:received', msg, Date.now()));
    }

    getUserInfo(): Promise<UserInfo> {
        let userInfo: UserInfo = {
            id: '140000198202211138',
            name: 'Luff',
            avatar: './assets/imgs/user.jpg'
        };
        if(this.userService.getUserRoleType() == 'customer') {
          userInfo = {
              id: '140000198202211138',
              name: 'VENTURE',
              avatar: './assets/imgs/customer.jpg'
          };
        }
        else if(this.userService.getUserRoleType() == 'driver') {
          userInfo = {
              id: '140000198202211138',
              name: 'MOBDRVR',
              avatar: './assets/imgs/driver.png'
          };
        }
        return new Promise(resolve => resolve(userInfo));
    }

    sendChatMessage(message: any): Observable<String> {
      const httpOptions = {
      headers: new HttpHeaders({
          'Content-Type':  'application/json'
        })
      };

      const hero = {
      	"text":message,
      	"clientAccessToken": "a3d30392a9a8442487b3d7593e6c1b7b",
      	"sessionID": this.userService.getUserSessionId(),
        "userRole": this.userService.getUserRoleType()
      };

      return this.http.post<any>(this.appUrl+'chats', hero, httpOptions)
        .pipe(
          tap((hero: any) => this.log(`added hero`)),
          catchError(this.handleError<any>('addHero', hero))
        );
    }

      /**
     * Handle Http operation that failed.
     * Let the app continue.
     * @param operation - name of the operation that failed
     * @param result - optional value to return as the observable result
     */
    private handleError<T> (operation = 'operation', result?: T) {
      return (error: any): Observable<T> => {

        // TODO: send the error to remote logging infrastructure
      //  console.error(error); // log to console instead

        // TODO: better job of transforming error for user consumption
        //this.log(`${operation} failed: ${error.message}`);

        // Let the app keep running by returning an empty result.
        return of(result as T);
      };
    }

    /** Log a HeroService message with the MessageService */
    private log(message: string) {
      //this.messageService.add('HeroService: ' + message);
    }

}
