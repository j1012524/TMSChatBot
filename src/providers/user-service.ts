import { Injectable } from '@angular/core';

@Injectable()
export class UserService {

  userRoleType: String = '';

  constructor() {
    //console.log('Hello UserServiceTsProvider Provider');
  }

  setUserRoleType(userRole: string) {
    this.userRoleType = userRole;
  }

  getUserRoleType() {
      return this.userRoleType;
  }

}
