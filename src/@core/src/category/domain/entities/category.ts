import { EntityValidationError } from "../../../@shared/domain/errors/validation.error";
import { Entity } from "../../../@shared/domain/entity/entity";
import { UniqueId } from "../../../@shared/domain/value-object/unique-id";
import CategoryValidatorFactory from "../validator/category.validator";
import { CategoryFakeBuilder } from "./category-fake-builder";
import { extend } from "lodash";

export type CategoryProps = {
  name: string;
  description?: string;
  is_active?: boolean;
  created_at?: Date;
};

export type CategoryPropsJson = Required<{ id: string } & CategoryProps>;

export type UpdateCategoryProps = {
  name: string;
  description: string;
};

export class CategoryId extends UniqueId {}

export class Category extends Entity<CategoryProps, CategoryPropsJson> {
  constructor(props: CategoryProps, entity_id?: CategoryId) {
    Category.validate(props);
    const { description, is_active, created_at } = props;

    super(props, entity_id ?? new CategoryId());
    this.description = description;
    this.is_active = is_active;
    this.created_at = created_at;
  }

  update(data: UpdateCategoryProps) {
    Category.validate(data);

    this.name = data.name;
    this.description = data.description ?? null;
  }

  // Old category validate
  /* static validate(props: Omit<CategoryProps, "created_at">) {
    ValidatorRules.values(props.name, "name")
      .required()
      .string()
      .maxLength(255);
    ValidatorRules.values(props.description, "description").string();
    ValidatorRules.values(props.is_active, "is_active").boolean();
  }*/

  static validate(props: CategoryProps) {
    const validator = CategoryValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
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

  static fake() {
    return CategoryFakeBuilder;
  }

  toJSON(): CategoryPropsJson {
    return {
      id: this.id.value,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}
