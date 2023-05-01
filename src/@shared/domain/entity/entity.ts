import { UniqueId } from "../value-object/unique-id";

export abstract class Entity<Props = any> {
  public readonly id: UniqueId;

  constructor(public readonly props: Props, id?: UniqueId) {
    this.id = id || new UniqueId();
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
