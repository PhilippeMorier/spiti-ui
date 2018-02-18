import { Component, ComponentFactoryResolver, Input, OnInit, ViewChild } from '@angular/core';
import { BaseModel } from '../../model/base.model';

import { Control, ControlConfig } from './control/control';
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
  public model: BaseModel;

  @Input()
  public configs: [ ControlConfig ];

  @ViewChild(FormControlHostDirective)
  private formHost: FormControlHostDirective;

  public constructor(private readonly componentFactoryResolver: ComponentFactoryResolver) {
  }

  public ngOnInit(): void {
    for (const config of this.configs) {
      const inputComponentFactory = this
        .componentFactoryResolver
        .resolveComponentFactory<Control>(config.component);
      const inputComponent = this.formHost.viewContainerRef.createComponent(inputComponentFactory);
      inputComponent.instance.group = this.model.formGroup;
      inputComponent.instance.config = config;

      this.syncModelWithFormGroupControl(config);
    }
  }

  private syncModelWithFormGroupControl(config): void {
    const control = this.model.formGroup.get(config.property);
    if (control) {
      control
        .valueChanges
        .subscribe((newValue) => this.model[ config.property ] = newValue);
    }
  }
}
