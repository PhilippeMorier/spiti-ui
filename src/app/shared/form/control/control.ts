import { FormGroup } from '@angular/forms';
import { FormConfig } from '../form.component';

export interface Control {
  group: FormGroup;
  config: FormConfig;
}
