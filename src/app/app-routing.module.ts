import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoute } from './app-route.enum';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoute.SignIn, pathMatch: 'full' },
  { path: AppRoute.SignIn, component: SignInComponent },
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
