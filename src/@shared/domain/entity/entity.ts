import { UniqueId } from "../value-object/unique-id";

export abstract class Entity<Props> {
  protected readonly _id: UniqueId;

  constructor(protected readonly props: Props, id?: UniqueId) {
    this._id = id || new UniqueId();
  }

  get id(): UniqueId {
    return this._id;
  }
}
