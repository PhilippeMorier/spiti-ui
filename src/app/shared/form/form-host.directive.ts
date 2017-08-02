import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[sptFormHost]',
})
export class FormHostDirective {
  public constructor(public readonly viewContainerRef: ViewContainerRef) {
  }
}
