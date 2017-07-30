import { IsEmail } from 'class-validator';
import * as firebase from 'firebase/app';

import { Model } from './decorator';

@Model()
export class User {
  public displayName?: string;

  @IsEmail()
  public email?: string;

  public uid: string;

  public constructor(fireBaseUser: firebase.User) {
    if (fireBaseUser.displayName) {
      this.displayName = fireBaseUser.displayName;
    }
    if (fireBaseUser.email) {
      this.email = fireBaseUser.email;
    }
    this.uid = fireBaseUser.uid;
  }
}
