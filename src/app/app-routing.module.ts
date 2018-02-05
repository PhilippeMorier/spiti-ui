import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './signup/sign-up.component';

export enum AppRoute {
  SignUp = 'sign-up',
  Login = 'login',
  Editor = 'editor',
  Account = 'account',
}

const routes: Routes = [
  { path: '', redirectTo: AppRoute.Login, pathMatch: 'full' },
  { path: AppRoute.Login, component: LoginComponent },
  { path: AppRoute.SignUp, component: SignUpComponent },
  { path: AppRoute.Editor, loadChildren: './editor/editor.module#EditorModule' },
  { path: AppRoute.Account, loadChildren: './account/account.module#AccountModule' },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
