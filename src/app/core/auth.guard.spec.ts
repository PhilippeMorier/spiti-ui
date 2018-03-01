import { inject, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Observable } from 'rxjs/Observable';
import { AppRoute } from '../app-route.enum';
import { EditorComponent } from '../editor/editor.component';
import { EditorModule } from '../editor/editor.module';

import { SessionService } from '../session.service';
import { AuthGuard } from './auth.guard';

describe('AuthGuard', () => {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        EditorModule,
        RouterTestingModule.withRoutes(
          [ {path: AppRoute.SignIn as string, component: EditorComponent} ],
        ),
      ],
      providers: [
        AuthGuard,
        { provide: SessionService, useValue: mockSessionService },
      ],
    });
  });

  it('should ...', inject([ AuthGuard ], (guard: AuthGuard) => {
    expect(guard).toBeTruthy();
  }));
});
