import { Component } from '@angular/core';

import { User } from '../model/user.model';
import { SessionService } from '../session.service';
import { ControlConfig } from '../shared/form/control/control';
import { InputType } from '../shared/form/control/input-type';
import { InputComponent } from '../shared/form/control/input/input.component';

@Component({
  selector: 'spt-sign-up',
  styleUrls: [ './sign-up.component.scss' ],
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  public user: User = new User();
  public config: [ ControlConfig ] = [ {
      component: InputComponent,
      placeholderText: 'Name',
      property: 'displayName',
      type: InputType.TEXT,
    }, {
      component: InputComponent,
      placeholderText: 'Email',
      property: 'email',
      type: InputType.EMAIL,
    }, {
      component: InputComponent,
      placeholderText: 'Password',
      property: 'password',
      type: InputType.PASSWORD,
    }, {
      component: InputComponent,
      placeholderText: 'Repeat password',
      property: 'repeatedPassword',
      type: InputType.PASSWORD,
    },
  ];

  public constructor(private readonly session: SessionService) {
  }

  public createUserWithEmailAndPassword(email: string, password: string): void {
    this.session.createUserWithEmailAndPassword(email, password);
  }
}
