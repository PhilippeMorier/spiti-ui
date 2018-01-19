import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';

import { SessionService } from '../session.service';
import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let mockSessionService: SessionService;

  beforeEach(() => {
    const mockUser = {
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
          MatButtonModule,
          MatCardModule,
          MatCheckboxModule,
        ],
        providers: [
          { provide: SessionService, useValue: mockSessionService },
        ],
        schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
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
