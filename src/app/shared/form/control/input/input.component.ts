import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { FormConfig } from '../../form.component';
import { Control } from '../control';
// https://github.com/angular/angular-cli/issues/2034
type FormConfigWorkAround = FormConfig;

@Component({
  selector: 'spt-input',
  styleUrls: ['./input.component.scss'],
  templateUrl: './input.component.html',
})
export class InputComponent implements Control {

  @Input()
  public group: FormGroup;

  @Input()
  public config: FormConfigWorkAround;

}
