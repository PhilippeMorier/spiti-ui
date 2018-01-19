import { Component } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'spt-editor',
  styleUrls: ['./editor.component.scss'],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  public subscriptions: Observable<Subscription[]>;

  public constructor(db: AngularFireDatabase) {
    this.subscriptions = db
      .list<Subscription>('/subscriptions')
      .valueChanges();
  }
}

export interface Subscription {
  name: string;
}
