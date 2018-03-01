import { Directive, Input, TemplateRef, ViewContainerRef } from '@angular/core';

class LetContext<T> {
  public sptLet: T;
}

// source: https://github.com/angular/angular/issues/2451#issuecomment-333675976
@Directive({
  selector: '[sptLet]',
})
export class LetDirective<T> {

  private context: LetContext<T> = new LetContext<T>();

  public constructor(viewContainer: ViewContainerRef, templateRef: TemplateRef<LetContext<T>>) {
    viewContainer.createEmbeddedView(templateRef, this.context);
  }

  @Input()
  set sptLet(value: T) {
    this.context.sptLet = value;
  }
}
