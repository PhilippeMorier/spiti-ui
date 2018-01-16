import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatInputModule } from '@angular/material';

import { AccountRoutingModule } from './account-routing.module';
import { AccountComponent } from './account.component';

@NgModule({
  declarations: [
    AccountComponent,
  ],
  imports: [
    CommonModule,
    AccountRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
})
export class AccountModule {
}
