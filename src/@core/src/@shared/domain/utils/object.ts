export function deepFreeze<T>(object: T) {
  try {
    const propNames = Object.getOwnPropertyNames(object);

    for (const name of propNames) {
      const value = object[name as keyof T];

      if (value && typeof value === "object") {
        deepFreeze(value);
      }
    }

    return Object.freeze(object);
  } catch (e) {
    return object;
  }
}
