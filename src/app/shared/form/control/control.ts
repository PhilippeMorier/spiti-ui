import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { InputType } from './input-type';

export interface Control {
  group: FormGroup;
  config: ControlConfig;
}

export interface ControlConfig {
  component: Type<Control>;
  placeholderText: string;
  property: string;
  type: InputType;
}
