import { Component } from '@angular/core';

import { User } from '../model/user.model';
import { ControlConfig } from '../shared/form/control/control';
import { InputType } from '../shared/form/control/input-type';
import { InputComponent } from '../shared/form/control/input/input.component';

@Component({
  selector: 'spt-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent {
  public user: User = new User();
  public config: [ ControlConfig ] = [
    {
      component: InputComponent,
      placeholderText: 'Name',
      property: 'displayName',
      type: InputType.TEXT,
    },
    {
      component: InputComponent,
      placeholderText: 'Email',
      property: 'email',
      type: InputType.EMAIL,
    },
  ];
}
