import { Injectable } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { init } from './fullstory-tag';
import { SessionService } from './session.service';

interface FullstoryIntegratedWindow extends Window {
  clearUserCookie(keepAnonymousCookie?: boolean): void;
  identify(uid: string, userVars?: UserData): void;
  setUserVars(userVars: UserData): void;
  getCurrentSessionURL(): string;
}

interface UserData {
  displayName?: string;
  email?: string;
  [key: string]: string | number | Date | boolean | undefined;
}

@Injectable()
export class Fullstory {
  private fullstoryWindow: FullstoryIntegratedWindow;
  private isReady: Subject<boolean> = new Subject<boolean>();

  public constructor(private readonly session: SessionService) {
    Observable
      .combineLatest(
        this.session.currentlySignedInUser,
        this.isReady,
      )
      .subscribe(([ user, isReady ]) => {
          if (user && user.email && isReady) {
            const userData: UserData = { email: user.email };
            if (user.displayName) {
              userData.displayName = user.displayName;
            }
            this.fullstoryWindow.identify(user.uid, userData);
          } else {
            this.fullstoryWindow.clearUserCookie(true);
          }
        },
      );
  }

  public init(): void {
    // tslint:disable
    window['_fs_ready'] = () => this.onReady();
    init();
  }

  private onReady(): void {
    console.info('Fullstory is isReady!');
    this.fullstoryWindow = window[ window[ '_fs_namespace' ] ];
    this.isReady.next(true);
  }
}
