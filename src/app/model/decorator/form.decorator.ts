import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { getFromContainer, Validator } from 'class-validator';
import { MetadataStorage } from 'class-validator/metadata/MetadataStorage';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';

import { createConstructor } from './create-constructor';

export function Form(): ClassDecorator {
  // need to react after constructor is called
  return (constructor: Function): any => {
    return createConstructor(
      constructor,
      (model) => {
        const targetMetadata = getFromContainer(MetadataStorage)
          .getTargetValidationMetadatas(model.constructor, '');

        constructor.prototype.formGroup = buildFormGroup(model, targetMetadata);
      },
    );
  };
}

function buildFormGroup(model: any, validations: ValidationMetadata[]): FormGroup {
  const groupedValidations = getFromContainer(MetadataStorage).groupByPropertyName(validations);
  const controlsConfig = {};
  for (const property in groupedValidations) {
    controlsConfig[ property ] = [
      model[ property ],
      createValidators(groupedValidations[ property ]),
    ];
  }

  return new FormBuilder().group(controlsConfig);
}

function createValidators(validations: ValidationMetadata[]): ValidatorFn[] {
  return validations.map((validation: ValidationMetadata) => {
    return createValidator(validation);
  });
}

const validator = new Validator();

function createValidator(validation: ValidationMetadata): ValidatorFn {
  return (control: AbstractControl): { [key: string]: {} } | null => {
    if (!validator[ validation.type ]) {
      throw new Error(
        `${validation.type} isn't a function on 'Validator'.
Please check: https://github.com/pleerock/class-validator#manual-validation`,
      );
    }

    const isValid: boolean = validator[ validation.type ](control.value, ...validation.constraints);
    if (isValid) {
      return null;
    }

    const error = {};
    error[ validation.type ] = validation.message;
    return error;
  };
}
