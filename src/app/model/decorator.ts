import { validate, ValidationError } from 'class-validator';

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
      formattedErrors += `\n - ${error.constraints[key]} (${error.property}: ${error.value})`;

    }
  }

  return formattedErrors;
}
