import { InvalidUuidError } from "../../errors";
import { UniqueId } from "../unique-id";
import { validate as uuidValidate } from "uuid";

function spyValidateMethod() {
  return jest.spyOn(UniqueId.prototype as any, "validate");
}

describe("Unique Id Unit Test", () => {
  it("should throw error when uuid is invalid", () => {
    const validateSpy = spyValidateMethod();
    expect(() => new UniqueId("invalid_id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
    const validateSpy = spyValidateMethod();

    const valueObject = new UniqueId(uuid);

    expect(valueObject.value).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should generate a valid uuid", () => {
    const validateSpy = spyValidateMethod();

    const valueObject = new UniqueId();

    expect(uuidValidate(valueObject.value)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
