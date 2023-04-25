import { UniqueId } from "../../../@shared/domain/value-object/unique-id";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export class Category {
  private props: CategoryProps;
  private _id: UniqueId;

  constructor(props: CategoryProps, id?: UniqueId) {
    const { is_active, created_at, description } = props;
    this._id = id ?? new UniqueId();
    this.props = props;
    this.props.description = description ?? null;
    this.props.is_active = is_active ?? true;
    this.props.created_at = created_at ?? new Date();
  }

  get id(): UniqueId {
    return this._id;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string {
    return this.props.description;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  get created_at(): Date {
    return this.props.created_at;
  }
}
