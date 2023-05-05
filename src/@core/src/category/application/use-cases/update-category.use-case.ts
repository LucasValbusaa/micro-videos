import { UseCase as DefaultUseCase } from "#shared/application";
import CategoryRepository from "#category/domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";

export namespace UpdateCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
    constructor(private categoryRepo: CategoryRepository.Repository) {}

    async execute(input: Input): Promise<Output> {
      const entity = await this.categoryRepo.findById(input.id);
      entity.update({ name: input.name, description: input.description });

      if (input.is_active === true) {
        entity.activate();
      }

      if (input.is_active === false) {
        entity.deactivate();
      }

      await this.categoryRepo.update(entity);
      return entity.toJSON();
    }
  }

  export type Input = {
    id: string;
    name: string;
    description?: string;
    is_active?: boolean;
  };

  export type Output = CategoryOutput;
}
