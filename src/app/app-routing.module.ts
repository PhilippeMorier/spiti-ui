import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';

export enum AppRoute {
  Login = 'login',
  Editor = 'editor',
  Account = 'account',
}

const routes: Routes = [
  { path: '', redirectTo: AppRoute.Login, pathMatch: 'full' },
  { path: AppRoute.Login, component: LoginComponent },
  { path: AppRoute.Editor, loadChildren: './editor/editor.module#EditorModule' },
  { path: AppRoute.Account, loadChildren: './account/account.module#AccountModule' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
