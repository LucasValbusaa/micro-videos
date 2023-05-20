import { UniqueId } from "../../../@shared/domain";
import { Category } from "./category";
import { Chance } from "chance";

type PropsOrFactory<T> = T | ((index: number) => T);

export class CategoryFakeBuilder<Tbuild = any> {
  //auto generated in entity
  private _unique_entity_id = undefined;
  private _name: PropsOrFactory<string> = (index) => this.chance.word();
  private _description: PropsOrFactory<string | null> = (index) =>
    this.chance.paragraph();
  private _is_active: PropsOrFactory<boolean> = (index) => true;
  //auto generated in entity
  private _created_at = undefined;

  private chance: Chance.Chance;

  private countObjs: number;

  private constructor(countsObjs: number = 1) {
    this.chance = Chance();
    this.countObjs = countsObjs;
  }

  static aCategory() {
    return new CategoryFakeBuilder<Category>();
  }

  static theCategories(countsObjs: number) {
    return new CategoryFakeBuilder<Category[]>(countsObjs);
  }

  withUniqueEntityId(valueOrFactory: PropsOrFactory<UniqueId>) {
    this._unique_entity_id = valueOrFactory;
    return this;
  }

  withName(valueOrFactory: PropsOrFactory<string>) {
    this._name = valueOrFactory;
    return this;
  }

  withInvalidNameEmpty(value: "" | null | undefined) {
    this._name = value;
    return this;
  }

  withInvalidNameNotAString(value?: any) {
    this._name = value ?? 5;
    return this;
  }

  withInvalidNameToLong(value?: string) {
    this._name = value ?? this.chance.word({ length: 256 });
    return this;
  }

  withDescription(valueOrFactory: PropsOrFactory<string | null>) {
    this._description = valueOrFactory;
    return this;
  }

  withInvalidDescriptionNotAString(value?: any) {
    this._description = value ?? 5;
    return this;
  }

  activate() {
    this._is_active = true;
    return this;
  }

  deactivate() {
    this._is_active = false;
    return this;
  }

  withInvalidIsActiveEmpty(value: "" | null | undefined) {
    this._is_active = value as any;
    return this;
  }

  withInvalidIsActiveNotABoolean(value?: any) {
    this._is_active = value ?? "fake boolean";
    return this;
  }

  withCreatedAt(valueOrFactory: PropsOrFactory<Date>) {
    this._created_at = valueOrFactory;
    return this;
  }

  build(): Tbuild {
    const categories = new Array(this.countObjs).fill(undefined).map(
      (_, index) =>
        new Category({
          ...(this._unique_entity_id && {
            id: this.callFactory(this._unique_entity_id, index),
          }),
          name: this.callFactory(this._name, index),
          description: this.callFactory(this._description, index),
          is_active: this.callFactory(this._is_active, index),
          ...(this._created_at && {
            created_at: this.callFactory(this._created_at, index),
          }),
        })
    );

    return this.countObjs === 1 ? (categories[0] as any) : categories;
  }

  get unique_entity_id(): unknown {
    return this.getValue("unique_entity_id");
  }

  get name(): PropsOrFactory<string> {
    return this.getValue("name");
  }

  get description(): PropsOrFactory<string | null> {
    return this.getValue("description");
  }

  get is_active(): PropsOrFactory<boolean> {
    return this.getValue("is_active");
  }

  get created_at(): unknown {
    return this.getValue("created_at");
  }

  private getValue(prop: string) {
    const optional = ["unique_entity_id", "created_at"];
    const privateProp = `_${prop}`;
    if (!this[privateProp] && optional.includes(prop)) {
      throw new Error(
        `Property ${prop} not have a factory, use 'with' methods`
      );
    }

    return this.callFactory(this[privateProp], 0);
  }

  private callFactory(factoryOrValue: PropsOrFactory<any>, index) {
    return typeof factoryOrValue === "function"
      ? factoryOrValue(index)
      : factoryOrValue;
  }
}
