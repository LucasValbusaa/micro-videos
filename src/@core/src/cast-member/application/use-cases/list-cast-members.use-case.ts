import { CastMemberRepository } from "../../domain/repository/cast-member.repository";
import {
  CastMemberOutput,
  CastMemberOutputMapper,
} from "../dto/cast-member-output";
import { UseCase as DefaultUseCase } from "../../../@shared/application/use-case";
import {
  SearchParamsInputDTO,
  PaginationOutputDTO,
  PaginationOutputMapper,
} from "../../../@shared/application/";
import { Types } from "../../domain";

export namespace ListCastMembersUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private castMemberRepo: CastMemberRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = CastMemberRepository.SearchParams.create(input);

      console.log("PARAMS:::", params);

      const searchResult = await this.castMemberRepo.search(params);

      console.log("SEARCH RESULT:::", searchResult);
      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CastMemberRepository.SearchResult): Output {
      const items = searchResult.toJSON().items.map((i) => {
        return CastMemberOutputMapper.toOutput(i);
      });

      return PaginationOutputMapper.toOutput(items, searchResult);
    }
  }

  export type Input = SearchParamsInputDTO<{ name?: string; type?: Types }>;

  export type Output = PaginationOutputDTO<CastMemberOutput>;
}

export default ListCastMembersUseCase;
