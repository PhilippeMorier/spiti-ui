import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { getFromContainer, validate, ValidationError, Validator } from 'class-validator';
import { MetadataStorage } from 'class-validator/metadata/MetadataStorage';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';

// tslint:disable:no-any
export function Model(): ClassDecorator {
  return function (constructor: Function): any {
    // save a reference to the original constructor
    const original = constructor;

    // the new constructor behaviour
    const newConstructor = function (): any {
      const result = original.apply(original.prototype, arguments);

      validate(original.prototype)
        .then(errors => {
          if (errors.length > 0) {
            throw new Error(formatErrors(errors));
          }
        })
        .catch(error => {
          console.error(error);
        });

      return result;
    };

    // copy prototype so intanceof operator still works
    newConstructor.prototype = original.prototype;

    // return new constructor (will override original)
    return newConstructor;
  };
}
// tslint:enable:no-any

function formatErrors(errors: ValidationError[]): string {
  let formattedErrors: string = 'Model Validation';
  for (const error of errors) {
    for (const key in error.constraints) {
      formattedErrors += `\n - ${error.constraints[ key ]} (${error.property}: ${error.value})`;
    }
  }

  return formattedErrors;
}

export function Form(): ClassDecorator {
  return function (constructor: Function): any {
    const targetMetadata = getFromContainer(MetadataStorage)
      .getTargetValidationMetadatas(constructor, '');

    constructor.prototype.formGroup = buildFormGroup(targetMetadata);
  };
}

function buildFormGroup(validations: ValidationMetadata[]): FormGroup {
  const groupedValidations = getFromContainer(MetadataStorage).groupByPropertyName(validations);
  const controlsConfig = {};
  for(const property in groupedValidations) {
    controlsConfig[ property ] = ['default value', createValidators(groupedValidations[property])];
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
  return (control: AbstractControl): {[key: string]: {}} | null => {
    if(!validator[ validation.type]) {
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
