import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountComponent } from './account.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: AccountComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ],
})
export class AccountRoutingModule {
}
