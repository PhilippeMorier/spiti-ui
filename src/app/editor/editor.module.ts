import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { BabylonComponent } from '../babylon/babylon.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditorComponent } from './editor.component';

@NgModule({
  declarations: [
    EditorComponent,
    BabylonComponent,
  ],
  imports: [
    CommonModule,
    EditorRoutingModule,
  ],
})
export class EditorModule {
}
