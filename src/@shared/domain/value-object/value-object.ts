import { deepFreeze } from "../utils/object";

export abstract class ValueObject<Value = any> {
  public readonly value: Value;

  constructor(value: Value) {
    this.value = deepFreeze(value);
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
