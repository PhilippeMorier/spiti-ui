import { AbstractControl, FormBuilder, FormGroup, ValidatorFn } from '@angular/forms';
import { getFromContainer, validate, ValidationError, Validator } from 'class-validator';
import { MetadataStorage } from 'class-validator/metadata/MetadataStorage';
import { ValidationMetadata } from 'class-validator/metadata/ValidationMetadata';

// tslint:disable:no-any
export function Model(): (constructor: Function) => any {
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

export function Form(): (target: Object, propertyKey: string) => void {
  return function (target: Object, propertyKey: string): void {
    const targetMetadatas = getFromContainer(MetadataStorage).getTargetValidationMetadatas(target.constructor, '');
    const groupedMetadatas = getFromContainer(MetadataStorage).groupByPropertyName(targetMetadatas);
    console.log(groupedMetadatas);

    target.constructor.prototype.formGroup = buildFormGroup(targetMetadatas);
    console.log(buildFormGroup(targetMetadatas));
  };
}

function buildFormGroup(validations: ValidationMetadata[]): FormGroup {
  const groupedValidations = getFromContainer(MetadataStorage).groupByPropertyName(validations);
  const builder = new FormBuilder();

  const controlsConfig = {};
  for(const property in groupedValidations) {
    controlsConfig[ property ] = ['default value', createValidators(groupedValidations[property])];
  }

  return builder.group(controlsConfig);
}

const validator = new Validator();
function createValidators(validations: ValidationMetadata[]): ValidatorFn[] {
  return validations.map((validation: ValidationMetadata) => {
    return createValidator(validation);
  });
}

function createValidator(validation: ValidationMetadata): ValidatorFn {
  return (control: AbstractControl): {[key: string]: {}} | null => {
    const isValid: boolean = validator[ validation.type ](control.value, ...validation.constraints);
    console.log(validation.type, isValid, validation.message);
    return isValid ? null : { property: validation.message};
  };
}
