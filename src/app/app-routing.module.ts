import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AppRoute } from './app-route.enum';
import { AuthGuard } from './core/auth.guard';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

const routes: Routes = [
  { path: '', redirectTo: AppRoute.SignIn, pathMatch: 'full' },
  { path: AppRoute.SignIn as string, component: SignInComponent },
  { path: AppRoute.SignUp as string, component: SignUpComponent },
  { path: AppRoute.Editor as string, loadChildren: './editor/editor.module#EditorModule' },
  {
    canActivate: [ AuthGuard ],
    loadChildren: './account/account.module#AccountModule',
    path: AppRoute.Account as string,
  },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {
}
