import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatCheckboxModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterTestingModule } from '@angular/router/testing';
import 'rxjs/add/observable/of';
import { Observable } from 'rxjs/Observable';
import { AppRoute } from '../app-route.enum';

import { EditorComponent } from '../editor/editor.component';
import { EditorModule } from '../editor/editor.module';
import { SessionService } from '../session.service';
import { SignInComponent } from './sign-in.component';

describe('SignInComponent', () => {
  let component: SignInComponent;
  let fixture: ComponentFixture<SignInComponent>;
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
      declarations: [ SignInComponent ],
      imports: [
        BrowserAnimationsModule,
        EditorModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        RouterTestingModule.withRoutes(
          [ {path: AppRoute.Editor, component: EditorComponent} ],
        ),

      ],
      providers: [
        {provide: SessionService, useValue: mockSessionService},
      ],
      schemas: [ CUSTOM_ELEMENTS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SignInComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
