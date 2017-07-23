import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MdButtonModule, MdCardModule, MdCheckboxModule, MdInputModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { SessionService, User } from '../session.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockSessionService: SessionService;
  let mockUser: User;

  beforeEach(() => {
    mockUser = {
      displayName: 'Philippe',
      email: 'philippe@test.com',
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
        declarations: [ LoginComponent ],
        imports: [
          BrowserAnimationsModule,
          MdButtonModule,
          MdCardModule,
          MdCheckboxModule,
          MdInputModule,
        ],
        providers: [
          { provide: SessionService, useValue: mockSessionService },
        ],
      })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
