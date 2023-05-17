import { UseCase as DefaultUseCase } from "../../../@shared/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import {
  SearchParamsInputDTO,
  PaginationOutputDTO,
} from "../../../@shared/application/dto";
import { PaginationOutputMapper } from "../../../@shared/application/utils/pagination-output";

export namespace ListCategoriesUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const params = new CategoryRepository.SearchParams(input);
      const searchResult = await this.categoryRepo.search(params);

      return this.toOutput(searchResult);
    }

    private toOutput(searchResult: CategoryRepository.SearchResult): Output {
      const items = searchResult
        .toJSON()
        .items.map((i: any) => CategoryOutputMapper.toOutput(i));
      return {
        items,
        ...PaginationOutputMapper.toOutput(searchResult),
      };
    }
  }

  export type Input = SearchParamsInputDTO;

  export type Output = PaginationOutputDTO<CategoryOutput>;
}
