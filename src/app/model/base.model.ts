import { FormGroup } from '@angular/forms';

export class BaseModel {

  /**
   * This property gets overwritten by the @Form() decorator.
   * Every model class has to extend this base class in order
   * to provide type safety.
   */
  public formGroup: FormGroup;
}
