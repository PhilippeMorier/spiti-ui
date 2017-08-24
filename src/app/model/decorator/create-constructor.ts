import { BaseModel } from '../base.model';

export function createConstructor(
  originalConstructor: Function,
  runAfter: (model: BaseModel) => void,
): Function {
  const newConstructor = (...args): BaseModel => {
    // Execute original constructor with all of its arguments
    const model = originalConstructor.apply(originalConstructor.prototype, args);

    runAfter(model);

    return model;
  };

  // copy prototype so intanceof operator still works
  newConstructor.prototype = originalConstructor.prototype;

  // return new constructor (will override original)
  return newConstructor;
}
