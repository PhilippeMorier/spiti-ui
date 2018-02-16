import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { getFromContainer, validate, ValidationError, Validator } from 'class-validator';
import { MetadataStorage } from 'class-validator/metadata/MetadataStorage';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';
import { Observable } from 'rxjs/Observable';

export abstract class BaseModel {

  private form: FormGroup;
  private validator: Validator = new Validator();

  public updateFromForm(): void {
    for (const property in this.formGroup.value) {
      this[ property ] = this.formGroup.value[ property ];
    }
  }

  public validate(): Observable<ValidationError[]> {
    return Observable.fromPromise(validate(this));
  }

  public get formGroup(): FormGroup {
    if (this.form) {
      return this.form;
    }

    const targetMetadata = getFromContainer(MetadataStorage)
      .getTargetValidationMetadatas(this.constructor, '');
    this.form = this.buildFormGroup(this, targetMetadata);

    return this.form;
  }

  private buildFormGroup(model: BaseModel, validations: ValidationMetadata[]): FormGroup {
    const groupedValidations = getFromContainer(MetadataStorage).groupByPropertyName(validations);
    const controlsConfig = {};
    for (const property in groupedValidations) {
      controlsConfig[ property ] = [
        model[ property ],
        this.createValidators(groupedValidations[ property ]),
      ];
    }

    return new FormBuilder().group(controlsConfig);
  }

  private createValidators(validations: ValidationMetadata[]): ValidatorFn[] {
    return validations.map((validation: ValidationMetadata) => {
      return this.createValidator(validation);
    });
  }

  private createValidator(validation: ValidationMetadata): ValidatorFn {
    return (control: AbstractControl): { [key: string]: {} } | null => {
      // if (validation.type === ValidationTypes.CUSTOM_VALIDATION) {
      //   let constraints = getFromContainer(MetadataStorage)
      //     .getTargetValidatorConstraints(validation.constraintCls);
      //   console.log('=============', model);
      //   const validationArguments: ValidationArguments = {
      //     constraints: validation.constraints,
      //     object: model,
      //     property: validation.propertyName,
      //     targetName: this.constructor ? this.constructor.name : undefined,
      //     value: control.value,
      //   };
      //
      //   let isGood = constraints[0].instance.validate(control.value, validationArguments);
      // }

      const isValid: boolean = this
        .validator
        .validateValueByMetadata(
          control.value,
          validation,
        );
      if (isValid) {
        return null;
      }

      const error = {};
      error[ validation.type ] = validation.message;

      return error;
    };
  }
}
