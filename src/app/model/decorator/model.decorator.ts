import { validate, ValidationError } from 'class-validator';

import { createConstructor } from './create-constructor';

export function Model(): ClassDecorator {
  // tslint:disable-next-line:no-any
  return (constructor: Function): any => {
    return createConstructor(
      constructor,
      (model) => {
        validate(model)
          .then(errors => {
            if (errors.length > 0) {
              throw new Error(formatErrors(model.constructor.name, errors));
            }
          })
          .catch(error => {
            console.info(error);
          });
      },
    );
  };
}

function formatErrors(className: string, errors: ValidationError[]): string {
  let formattedErrors: string = `Model Validation for '${className}'`;
  for (const error of errors) {
    for (const key in error.constraints) {
      formattedErrors += `\n - ${error.constraints[ key ]} (${error.property}: ${error.value})`;
    }
  }

  return formattedErrors;
}
