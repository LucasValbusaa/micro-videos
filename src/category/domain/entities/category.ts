import { Entity } from "../../../@shared/domain/entity/entity";
import { UniqueId } from "../../../@shared/domain/value-object/unique-id";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type UpdateCategoryProps = {
  name: string;
  description?: string;
};

export class Category extends Entity<CategoryProps> {
  constructor(props: CategoryProps, id?: UniqueId) {
    super(props, id);
    const { is_active, created_at, description } = props;
    this.description = description;
    this.is_active = is_active;
    this.created_at = created_at;
  }

  update({ name, description }: UpdateCategoryProps) {
    this.name = name;
    this.description = description ?? this.description;
  }

  activate() {
    this.is_active = true;
  }

  deactivate() {
    this.is_active = false;
  }

  get name(): string {
    return this.props.name;
  }

  private set name(value: string) {
    this.props.name = value;
  }

  get description(): string {
    return this.props.description;
  }

  private set description(value: string) {
    this.props.description = value ?? null;
  }

  get is_active(): boolean {
    return this.props.is_active;
  }

  private set is_active(value: boolean) {
    this.props.is_active = value ?? true;
  }

  get created_at(): Date {
    return this.props.created_at;
  }

  private set created_at(value: Date) {
    this.props.created_at = value ?? new Date();
  }
}
