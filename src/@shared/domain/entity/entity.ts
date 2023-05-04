import { UniqueId } from "../value-object";

export abstract class Entity<Props = any> {
  public readonly id: UniqueId;

  constructor(public readonly props: Props, id?: UniqueId) {
    this.id = id || new UniqueId();
  }

  toJSON(): Required<{ id: string } & Props> {
    return {
      id: this.id.value,
      ...this.props,
    } as Required<{ id: string } & Props>;
  }
}
