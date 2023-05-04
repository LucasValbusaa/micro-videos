import { UseCase } from "#shared/application";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput, CategoryOutputMapper } from "../dto/category-output";
import {
  SearchParamsInputDTO,
  PaginationOutputDTO,
} from "#shared/application/dto";
import { PaginationOutputMapper } from "#shared/application/utils";

export class ListCategoriesUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const params = new CategoryRepository.SearchParams(input);
    const searchResult = await this.categoryRepo.search(params);

    return this.toOutput(searchResult);
  }

  private toOutput(searchResult: CategoryRepository.SearchResult): Output {
    const items = searchResult
      .toJSON()
      .items.map((i) => CategoryOutputMapper.toOutput(i));
    return {
      items,
      ...PaginationOutputMapper.toOutput(searchResult),
    };
  }
}

export type Input = SearchParamsInputDTO;

export type Output = PaginationOutputDTO<CategoryOutput>;
