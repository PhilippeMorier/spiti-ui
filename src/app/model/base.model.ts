import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { getFromContainer, Validator } from 'class-validator';
import { MetadataStorage } from 'class-validator/metadata/MetadataStorage';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';

export abstract class BaseModel {

  private form: FormGroup;
  private validator: Validator = new Validator();

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
