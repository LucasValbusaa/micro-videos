import { UseCase as DefaultUseCase } from "../../../@shared/application/use-case";
import CategoryRepository from "../../domain/repository/category.repository";

export namespace DeleteCategoryUseCase {
  export class UseCase implements DefaultUseCase<Input, Output> {
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
}
