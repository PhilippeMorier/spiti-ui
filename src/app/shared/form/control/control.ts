import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Control {
  group: FormGroup;
  config: ControlConfig;
}

export interface ControlConfig {
  component: Type<Control>;
  property: string;
}
