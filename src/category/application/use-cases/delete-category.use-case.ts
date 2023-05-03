import { UseCase } from "../../../@shared/application/use-case";
import { Category } from "../../domain/entities/category";
import CategoryRepository from "../../domain/repository/category.repository";
import { CategoryOutput } from "../dto/category-output";

export class DeleteCategoryUseCase implements UseCase<Input, Output> {
  constructor(private categoryRepo: CategoryRepository.Repository) {}

  async execute(input: Input): Promise<Output> {
    const entity = await this.categoryRepo.findById(input.id);
    await this.categoryRepo.delete(entity.id.value);
  }
}

export type Input = {
  id: string;
};

export type Output = void;
