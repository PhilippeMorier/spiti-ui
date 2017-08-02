import { IsEmail, IsString, MinLength } from 'class-validator';
import * as firebase from 'firebase/app';

import { Form, Model } from './decorator';

@Model()
@Form()
export class User {
  @IsString()
  public displayName?: string;

  @IsEmail()
  @MinLength(4)
  public email?: string;

  @IsString()
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
