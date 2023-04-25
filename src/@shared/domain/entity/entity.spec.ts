import { UniqueId } from "../value-object/unique-id";
import { Entity } from "./entity";
import { validate as uuidValidate } from "uuid";

type stubProps = {
  prop1: string;
  prop2: number;
};

class StubEntity extends Entity<stubProps> {
  constructor(props: stubProps, id?: UniqueId) {
    super(props, id);
  }

  get _props() {
    return this.props;
  }
}

describe("Entity Unit Test", () => {
  it("should set props and id", () => {
    const arrange = { prop1: "any_value", prop2: 10 };

    const entity = new StubEntity(arrange);

    expect(entity._props).toStrictEqual(arrange);
    expect(entity.id).toBeInstanceOf(UniqueId);
    expect(uuidValidate(entity.id.value)).toBeTruthy();
  });

  it("should accept a valid uuid", () => {
    const arrange = { prop1: "any_value", prop2: 10 };
    const uniqueId = new UniqueId();

    const entity = new StubEntity(arrange, uniqueId);

    expect(entity.id).toBeInstanceOf(UniqueId);
    expect(entity.id.value).toBe(uniqueId.value);
  });
});
