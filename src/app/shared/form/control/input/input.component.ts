import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/switchMap';
import { Observable } from 'rxjs/Observable';

import { Control, ControlConfig } from '../control';

@Component({
  selector: 'spt-input',
  styleUrls: [ './input.component.scss' ],
  templateUrl: './input.component.html',
})
export class InputComponent implements Control, OnInit {

  @Input()
  public group: FormGroup;

  @Input()
  public config: ControlConfig;

  public errorMessage: Observable<string>;

  public ngOnInit(): void {
    const property = this.group.get(this.config.property);
    if (property) {
      this.errorMessage = property.valueChanges
        .filter(() => !!property.errors)
        .map(() => {
          let errors: string = '';

          if (property.errors) {
            for (const key in property.errors) {
              errors += `${property.errors[ key ]} `;
            }
          }

          return errors;
        });
    }
  }
}
