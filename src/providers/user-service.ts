import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  userRoleType: String = '';
  userSessionId: String = '';

  constructor() {
    //console.log('Hello UserServiceTsProvider Provider');
  }

  setUserRoleType(userRole: string) {
    this.userRoleType = userRole;
  }

  getUserRoleType() {
      return this.userRoleType;
  }

  setUserSessionId(sessionId: string) {
    this.userSessionId = sessionId;
  }

  getUserSessionId() {
    return this.userSessionId;
  }

}
