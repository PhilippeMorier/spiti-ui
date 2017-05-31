import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { EditorComponent } from './editor.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: EditorComponent },
];

@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forChild(routes) ],
})
export class EditorRoutingModule {
}
