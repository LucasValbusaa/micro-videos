import { UseCase as DefaultUseCase } from "#shared/application";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";

export namespace GetCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
      return entity.toJSON();
    }
  }

  export type Input = {
    id: string;
  };

  export type Output = CategoryOutput;
}
