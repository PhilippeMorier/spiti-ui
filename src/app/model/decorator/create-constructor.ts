export function createConstructor(
  originalConstructor: Function,
  // tslint:disable-next-line:no-any
  runAfter: (model: any) => void,
): Function {
  const newConstructor = (...args): Function => {
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
