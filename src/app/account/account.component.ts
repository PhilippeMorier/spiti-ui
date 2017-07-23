import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { SessionService, User } from '../session.service';

@Component({
  selector: 'spt-account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  public user: Observable<User>;

  public constructor(session: SessionService) {
    this.user = session.currentlySignedInUser();
  }
}
