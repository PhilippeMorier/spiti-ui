import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularFireDatabase } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { BabylonComponent } from '../babylon/babylon.component';
import { EditorComponent } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let mockDb: AngularFireDatabase;

  beforeEach(() => {
    mockDb = jasmine.createSpyObj('db', [ 'list' ]);
    (<jasmine.Spy> mockDb.list)
      .and.returnValue(Observable.of([
      {
        name: 'subscription 1',
      },
    ]));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [
          BabylonComponent,
          EditorComponent,
        ],
        providers: [
          { provide: AngularFireDatabase, useValue: mockDb },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    const firstListItem = fixture.debugElement.query(By.css('li'));
    expect(firstListItem.nativeElement.innerText).toEqual('subscription 1');
  });
});
