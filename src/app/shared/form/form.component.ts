import {
  Component, ComponentFactoryResolver, Input, OnInit, Type, ViewChild,
} from '@angular/core';

import { User } from '../../model/user.model';
import { FormControlHostDirective } from './form-control-host.directive';

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

  @Input()
  public configs: [FormConfig];

  @ViewChild(FormControlHostDirective)
  private formHost: FormControlHostDirective;

  public constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit(): void {
    for(const config of this.configs) {
      const inputComponentFactory = this
        .componentFactoryResolver
        .resolveComponentFactory<any>(config.component);
      const inputComponent = this.formHost.viewContainerRef.createComponent(inputComponentFactory);
      inputComponent.instance.group = this.model.formGroup;
      inputComponent.instance.config = config;
    }
  }
}

export interface FormConfig {
  component: Type<{}>;
  property: string;
}
