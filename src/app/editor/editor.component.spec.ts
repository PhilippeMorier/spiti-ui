import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';

import { BabylonComponent } from '../babylon/babylon.component';
import { EditorComponent, Subscription } from './editor.component';

describe('EditorComponent', () => {
  let component: EditorComponent;
  let fixture: ComponentFixture<EditorComponent>;
  let mockDb: AngularFireDatabase;
  let mockList: AngularFireList<Subscription>;

  beforeEach(() => {
    mockDb = jasmine.createSpyObj('db', [ 'list' ]);
    mockList = jasmine.createSpyObj('list', [ 'valueChanges' ]);
    (<jasmine.Spy> mockDb.list).and.returnValue(mockList);
    (<jasmine.Spy> mockList.valueChanges)
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
    expect(component).toBeTruthy();
    const firstListItem = fixture.debugElement.query(By.css('li'));
    expect(firstListItem.nativeElement.innerText).toEqual('subscription 1');
  });
});
