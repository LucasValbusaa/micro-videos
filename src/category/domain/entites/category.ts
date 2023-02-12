import { UniqueId } from "../../../@shared/domain/value-objects/unique-id";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active: boolean;
  created_at?: Date;
};

export class Category {
  private props: CategoryProps;
  private readonly id: UniqueId;

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

  get _id(): UniqueId {
    return this.id;
  }

  constructor(props: CategoryProps, id?: UniqueId) {
    this.id = id || new UniqueId();
    this.props = props;
    this.props.created_at = props.created_at ?? new Date();
  }
}
