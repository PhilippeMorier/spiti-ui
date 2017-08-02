import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sptFormControlHost]',
})
export class FormControlHostDirective {
  public constructor(public readonly viewContainerRef: ViewContainerRef) {
  }
}
