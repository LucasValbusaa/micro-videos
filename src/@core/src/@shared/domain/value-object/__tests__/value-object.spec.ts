import { ValueObject } from "../value-object";

class StubValueObject extends ValueObject {}

describe("ValueObject Unit Test", () => {
  it("should set value", () => {
    let valueObject = new StubValueObject("string value");
    expect(valueObject.value).toBe("string value");

    valueObject = new StubValueObject({ prop1: "value1" });
    expect(valueObject.value).toStrictEqual({ prop1: "value1" });
  });

  it("should convert to a string", () => {
    const instanceDate = new Date();
    const arrange = [
      { received: "", expected: "" },
      { received: "fake test", expected: "fake test" },
      { received: 0, expected: "0" },
      { received: 1, expected: "1" },
      { received: 5, expected: "5" },
      { received: true, expected: "true" },
      { received: false, expected: "false" },
      { received: instanceDate, expected: instanceDate.toString() },
      {
        received: { prop1: "value1" },
        expected: JSON.stringify({ prop1: "value1" }),
      },
    ];

    arrange.forEach((value) => {
      const valueObject = new StubValueObject(value.received);
      expect(valueObject + "").toBe(value.expected);
    });
  });

  it("should be immutable", () => {
    const valueObject = new StubValueObject({ prop1: "value1" });
  });
});
