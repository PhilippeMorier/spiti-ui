import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MdCardModule } from '@angular/material';
import { Observable } from 'rxjs/Observable';

import { User } from '../model/user.model';
import { SessionService } from '../session.service';
import { AccountComponent } from './account.component';

describe('AccountComponent', () => {
  let component: AccountComponent;
  let fixture: ComponentFixture<AccountComponent>;
  let mockSessionService: SessionService;
  let mockUser: User;

  beforeEach(() => {
    mockUser = {
      displayName: 'Philippe',
      email: 'philippe@test.com',
      formGroup: new FormGroup({}),
      uid: '4242',
    };
    mockSessionService = jasmine.createSpyObj<SessionService>(
      'mockSessionService',
      [ 'currentlySignedInUser' ],
    );
    (<jasmine.Spy> mockSessionService.currentlySignedInUser)
      .and.returnValue(Observable.of(mockUser));
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
        declarations: [ AccountComponent ],
        imports: [ MdCardModule ],
        providers: [
          { provide: SessionService, useValue: mockSessionService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
