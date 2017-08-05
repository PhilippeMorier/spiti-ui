import { Type } from '@angular/core';
import { FormGroup } from '@angular/forms';

export interface Control {
  group: FormGroup;
  config: ControlConfig;
}

export interface ControlConfig {
  component: Type<Control>;
  placeholderText: string;
  property: string;
  type: string;
}

// export enum InputType {
//   DATE = 'date',
//   DATETIMELOCAL = 'datetime-local',
//   EMAIL = 'email',
//   MONTH = 'month',
//   NUMBER = 'number',
//   PASSWORD = 'password',
//   SEARCH = 'search',
//   TEL = 'tel',
//   TEXT = 'text',
//   TIME = 'time',
//   URL = 'url',
//   WEEK = 'week',
// }
