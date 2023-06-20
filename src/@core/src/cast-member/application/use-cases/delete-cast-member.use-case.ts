import { CastMemberRepository } from "../../domain/repository/cast-member.repository";
import { UseCase as DefaultUseCase } from "../../../@shared/application/use-case";

export namespace DeleteCastMemberUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(
      private castMemberRepository: CastMemberRepository.Repository
    ) {}

    async execute(input: Input): Promise<Output> {
      await this.castMemberRepository.delete(input.id);
    }
  }

  export type Input = {
    id: string;
  };

  type Output = void;
}

export default DeleteCastMemberUseCase;
