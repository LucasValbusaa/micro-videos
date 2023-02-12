import { InvalidUuidError } from "../../errors/invalid-uuid.error";
import { UniqueId } from "./unique-id";
import { validate as uuidValidate } from "uuid";

function spyValidMethod() {
  return jest.spyOn(UniqueId.prototype as any, "validate");
}
const validateSpy = spyValidMethod();

describe("UniqueId Unit Test", () => {
  it("should throws error when uuid is invalid", () => {
    expect(() => new UniqueId("fake id")).toThrow(new InvalidUuidError());
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uuid = "1ed38e0c-1ab5-48f8-9d0a-76a1ac051268";
    const uniqueId = new UniqueId(uuid);
    expect(uniqueId._id).toBe(uuid);
    expect(validateSpy).toHaveBeenCalled();
  });

  it("should accept a uuid passed in constructor", () => {
    const uniqueId = new UniqueId();
    expect(uuidValidate(uniqueId._id)).toBeTruthy();
    expect(validateSpy).toHaveBeenCalled();
  });
});
