import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormGroup } from '@angular/forms';
import { MdIconModule, MdToolbarModule, matTooltipModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';

import { AppComponent } from './app.component';
import { User } from './model/user.model';
import { SessionService } from './session.service';

describe('AppComponent', () => {
  let component: AppComponent;
  let fixture: ComponentFixture<AppComponent>;
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
      declarations: [
        AppComponent,
      ],
      imports: [
        RouterTestingModule,
        MdToolbarModule,
        MdIconModule,
        matTooltipModule,
      ],
      providers: [
        { provide: SessionService, useValue: mockSessionService },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the app', () => {
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render menu links', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelectorAll('mat-toolbar a').item(0).textContent).toEqual('Login');
    expect(compiled.querySelectorAll('mat-toolbar a').item(1).textContent).toEqual('Editor');
  });
});
