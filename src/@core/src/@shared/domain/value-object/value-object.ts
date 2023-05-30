import { deepFreeze } from "../utils";
import isEqual from "lodash/isEqual";

export abstract class ValueObject<Value = any> {
  public readonly value: Value;

  constructor(value: Value) {
    this.value = deepFreeze(value);
  }

  equals(obj: this): boolean {
    if (obj === null || obj === undefined) {
      return false;
    }

    if (obj.value === undefined) {
      return false;
    }

    if (obj.constructor.name !== this.constructor.name) {
      return false;
    }

    return isEqual(this.value, obj.value);
  }

  toString = () => {
    if (typeof this.value !== "object" || this.value === null) {
      try {
        return this.value.toString();
      } catch (error) {
        return this.value + "";
      }
    }

    const valueStr = this.value.toString();
    return valueStr === "[object Object]"
      ? JSON.stringify(this.value)
      : valueStr;
  };
}
