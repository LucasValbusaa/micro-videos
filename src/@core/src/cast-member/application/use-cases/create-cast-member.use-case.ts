import { CastMember } from "../../domain/entities/cast-member";
import { CastMemberRepository } from "../../domain/repository/cast-member.repository";
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from "../dto/cast-member-output";
import { UseCase as DefaultUseCase } from "../../../@shared/application";
import { CastMemberType, Types } from "../../domain";
import { EntityValidationError } from "../../../@shared/domain";

export namespace CreateCastMemberUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private castMemberRepo: CastMemberRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const [type, errorCastMemberType] = CastMemberType.create(input.type);

      try {
        const entity = new CastMember({
          ...input,
          type,
        });
        await this.castMemberRepo.insert(entity);
        return CastMemberOutputMapper.toOutput(entity);
      } catch (e) {
        this.handleError(e, errorCastMemberType);
      }
    }

    private handleError(e: Error, errorCastMemberType: Error | undefined) {
      if (e instanceof EntityValidationError) {
        e.setFromError("type", errorCastMemberType);
      }

      throw e;
    }
  }

  export type Input = {
    name: string;
    type: Types;
  };

  export type Output = CastMemberOutput;
}
