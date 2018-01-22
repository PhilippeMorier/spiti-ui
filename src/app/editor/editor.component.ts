import { Component, Injector, NgZone } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'spt-editor',
  styleUrls: [ './editor.component.scss' ],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  public subscriptions: Observable<Subscription[]>;
  private db: AngularFireDatabase;

  public constructor(
    injector: Injector,
    zone: NgZone,
  ) {
    zone.runOutsideAngular(() => {
      this.db = injector.get(AngularFireDatabase);
    });

    this.subscriptions = this.db
        .list<Subscription>('/subscriptions')
        .valueChanges();
  }
}

export interface Subscription {
  name: string;
}
