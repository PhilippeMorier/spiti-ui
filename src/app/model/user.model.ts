import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import * as firebase from 'firebase/app';

import { BaseModel } from './base.model';
import { Form, Model } from './decorator';

@Model()
@Form()
export class User extends BaseModel {
  @IsString()
  @MaxLength(10, { message: 'Display name has a maximum length of 10 characters.' })
  public displayName?: string;

  @IsEmail({}, { message: 'Invalid email.' })
  @MinLength(4)
  public email?: string;

  @IsString()
  public uid: string;

  public constructor(fireBaseUser: firebase.User) {
    super();

    if (fireBaseUser.displayName) {
      this.displayName = fireBaseUser.displayName;
    }
    if (fireBaseUser.email) {
      this.email = fireBaseUser.email;
    }
    this.uid = fireBaseUser.uid;
  }
}
