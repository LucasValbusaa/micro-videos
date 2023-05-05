import { UseCase as DefaultUseCase } from "#shared/application";
import { Category } from "#category/domain/entities";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";

export namespace CreateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = new Category(input);
      await this.categoryRepo.insert(entity);
      return entity.toJSON();
    }
  }

  export type Input = {
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;
}
