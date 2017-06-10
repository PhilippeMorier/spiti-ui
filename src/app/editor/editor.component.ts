import { Component } from '@angular/core';
import { AngularFireDatabase, FirebaseListObservable } from 'angularfire2/database';

@Component({
  selector: 'spt-editor',
  styleUrls: ['./editor.component.scss'],
  templateUrl: './editor.component.html',
})
export class EditorComponent {
  public subscriptions: FirebaseListObservable<any[]>;

  public constructor(db: AngularFireDatabase) {
    this.subscriptions = db.list('/subscriptions');
  }
}
