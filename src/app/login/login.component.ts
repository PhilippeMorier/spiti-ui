import { Component } from '@angular/core';

@Component({
  selector: 'spt-login',
  styleUrls: ['./login.component.scss'],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  public throwErrorForSentry(): void {
    throw new Error('Catch this, sentry!');
  }
}
