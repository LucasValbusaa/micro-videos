import {
  Entity,
  EntityValidationError,
  UniqueId,
} from "../../../@shared/domain";
import CastMemberValidatorFactory from "../validators/cast-member.validator";
import { CastMemberType, Types } from "../value-object/cast-member-type.vo";
import { CastMemberFakeBuilder } from "./cast-member-fake-builder";

export type CastMemberProperties = {
  name: string;
  type: CastMemberType;
  created_at?: Date;
};

export class CastMemberId extends UniqueId {}

export type CastMemberPropsJson = Required<
  { id: string } & Omit<CastMemberProperties, "type"> & { type: Types }
>;

export class CastMember extends Entity<
  CastMemberProperties,
  CastMemberPropsJson
> {
  constructor(public readonly props: CastMemberProperties, id?: CastMemberId) {
    super(props, id ?? new CastMemberId());
    CastMember.validate(props);
    this.props.created_at = this.props.created_at ?? new Date();
  }

  update(name: string, type: CastMemberType) {
    CastMember.validate({
      name,
      type,
    });
    this.name = name;
    this.type = type;
  }

  static validate(props: CastMemberProperties) {
    const validator = CastMemberValidatorFactory.create();
    const isValid = validator.validate(props);
    if (!isValid) {
      throw new EntityValidationError(validator.errors);
    }
  }

  get name() {
    return this.props.name;
  }

  private set name(value) {
    this.props.name = value;
  }

  get type() {
    return this.props.type;
  }

  private set type(value: CastMemberType) {
    this.props.type = value;
  }

  get created_at() {
    return this.props.created_at;
  }

  static fake() {
    return CastMemberFakeBuilder;
  }

  toJSON(): CastMemberPropsJson {
    return {
      id: this.id.value,
      ...this.props,
      type: this.type.value,
    } as CastMemberPropsJson;
  }
}
