import { Injectable } from '@angular/core';
import 'rxjs/add/observable/combineLatest';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { SessionService } from './session.service';

interface FullstoryIntegratedWindow extends Window {
  clearUserCookie(keepAnonymousCookie?: boolean): void;
  identify(uid: string, userVars?: UserData): void;
  setUserVars(userVars: UserData): void;
  getCurrentSessionURL(): string;
}

interface UserData {
  [key: string]: string | number | Date | boolean;
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
      .subscribe(([user, isReady]) => {
          if (user && isReady) {
            this.fullstoryWindow.identify(user.uid, {
              displayName: user.displayName,
              email: user.email,
            });
          } else {
            this.fullstoryWindow.clearUserCookie(true);
          }
        },
      );
  }

  public init(): void {
    // tslint:disable
    window['_fs_ready'] = () => this.onReady();
    window['_fs_debug'] = false;
    window['_fs_host'] = 'fullstory.com';
    window['_fs_org'] = '4TVYC';
    window['_fs_namespace'] = 'FS';
    (function(m,n,e,t,l,o,g,y){
      if (e in m && m.console && m.console.log) { m.console.log('FullStory namespace conflict. Please set window["_fs_namespace"].'); return;}
      g=m[e]=function(a,b){g.q?g.q.push([a,b]):g._api(a,b);};g.q=[];
      o=n.createElement(t);o.async=1;o.src='https://'+ window['_fs_host'] +'/s/fs.js';
      y=n.getElementsByTagName(t)[0];y.parentNode.insertBefore(o,y);
      g.identify=function(i,v){g(l,{uid:i});if(v)g(l,v)};g.setUserVars=function(v){g(l,v)};
      g.identifyAccount=function(i,v){o='account';v=v||{};v.acctId=i;g(o,v)};
      g.clearUserCookie=function(c,d,i){if(!c || document.cookie.match('fs_uid=[`;`]*`[`;`]*`[`;`]*`')){
        d=n.domain;while(1){n.cookie='fs_uid=;domain='+d+
          ';path=/;expires='+new Date(0).toUTCString();i=d.indexOf('.');if(i<0)break;d=d.slice(i+1)}}};
    })(window,document,window['_fs_namespace'],'script','user');
  }

  private onReady(): void {
    console.info('Fullstory is isReady!');
    this.fullstoryWindow = window[ window[ '_fs_namespace' ] ];
    this.isReady.next(true);
  }
}
