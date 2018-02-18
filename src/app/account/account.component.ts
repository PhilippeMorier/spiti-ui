import { Component } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user.model';
import { SessionService } from '../session.service';

@Component({
  selector: 'spt-account',
  styleUrls: ['./account.component.scss'],
  templateUrl: './account.component.html',
})
export class AccountComponent {
  public user: Observable<User | undefined>;

  public constructor(private readonly session: SessionService) {
    this.user = session.currentlySignedInUser();
  }

  public signOut(): void {
    this.session.signOut();
  }
}
