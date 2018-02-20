import {
  Component, ComponentFactoryResolver, EventEmitter, Input, OnInit, Output,
  ViewChild,
} from '@angular/core';
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

  @Output()
  public submit: EventEmitter<void> = new EventEmitter<void>();

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

  public emitSubmission(): void {
    this.submit.emit();
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
