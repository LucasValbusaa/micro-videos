import { UniqueId } from "../value-object/unique-id";

export abstract class Entity<Props = any> {
  protected readonly _id: UniqueId;

  constructor(protected readonly props: Props, id?: UniqueId) {
    this._id = id || new UniqueId();
  }

  get id(): string {
    return this._id.value;
  }

  get _props(): Props {
    return this.props;
  }

  toJSON() {
    return {
      id: this.id,
      ...this.props,
    };
  }
}
