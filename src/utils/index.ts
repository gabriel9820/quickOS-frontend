export function removeEmptyValuesFromObject<
  T extends Record<string, any> | undefined
>(object: T): Partial<T> {
  if (!object) {
    return {};
  }

  const newObject = {} as any;

  Object.keys(object).forEach((key) => {
    if (object[key]) {
      newObject[key] = object[key];
    }
  });

  return newObject;
}
