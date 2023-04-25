import { InvalidUuidError } from "./invalid-uuid.error";

describe("Invalid uuid error test", () => {
  it("Should return a invalid uuid message error", () => {
    const error = new InvalidUuidError();
    expect(error).toBeInstanceOf(Error);
    expect(error.name).toBe("Invalid Uuid Error");
    expect(error.message).toBe("ID must be a valid uuid");
  });
});
