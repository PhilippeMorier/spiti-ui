import { validate } from 'class-validator';

export function Model(): (constructor: Function) => any {
  return function (constructor: Function): any {
    // save a reference to the original constructor
    const original = constructor;

    // the new constructor behaviour
    const newConstructor = function (): any {
      const result = original.apply(original.prototype, arguments);

      validate(original.prototype)
        .then(errors => console.log(errors));

      return result;
    };

    // copy prototype so intanceof operator still works
    newConstructor.prototype = original.prototype;

    // return new constructor (will override original)
    return newConstructor;
  };
}
