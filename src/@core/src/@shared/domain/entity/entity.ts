import { UniqueId } from "../value-object";

export abstract class Entity<
  Props = any,
  JsonProps = Required<{ id: string }> & Props
> {
  public readonly id: UniqueId;

  constructor(public readonly props: Props, id?: UniqueId) {
    this.id = id || new UniqueId();
  }

  abstract toJSON(): JsonProps;
}
