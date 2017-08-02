import {
  Component, ComponentFactoryResolver, Input, OnInit, ViewChild,
} from '@angular/core';

import { User } from '../../model/user.model';
import { FormControlHostDirective } from './form-control-host.directive';
import { InputComponent } from './input/input.component';

// https://angular.io/guide/dynamic-component-loader
// https://toddmotto.com/angular-dynamic-components-forms
@Component({
  selector: 'spt-form',
  styleUrls: [ './form.component.scss' ],
  templateUrl: './form.component.html',
})
export class FormComponent implements OnInit {

  @Input()
  public model: User;

  @ViewChild(FormControlHostDirective)
  private formHost: FormControlHostDirective;

  public constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit(): void {
    const inputComponentFactory = this
      .componentFactoryResolver
      .resolveComponentFactory(InputComponent);
    const inputComponent = this.formHost.viewContainerRef.createComponent(inputComponentFactory);
    inputComponent.instance.group = (<any> this.model).formGroup;
  }

}
