import { IsEmail, IsString, MaxLength, MinLength } from 'class-validator';
import * as firebase from 'firebase/app';

import { BaseModel} from './base.model';

export class User extends BaseModel {
  @MaxLength(10, { message: 'Max length is 10 characters.' })
  public displayName?: string;

  @IsEmail({}, { message: 'Invalid email.' })
  @MinLength(4, { message: 'Min length is 4 characters.' })
  public email?: string;

  @IsString()
  public uid: string;

  public constructor(fireBaseUser?: firebase.User) {
    super();
    if (!fireBaseUser) {
      return;
    }

    if (fireBaseUser.displayName) {
      this.displayName = fireBaseUser.displayName;
    }
    if (fireBaseUser.email) {
      this.email = fireBaseUser.email;
    }
    this.uid = fireBaseUser.uid;
  }
}
