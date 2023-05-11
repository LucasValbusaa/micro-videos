import { CreateCategoryUseCase } from "@micro-videos/core/src/category/application";

export class CreateCategoryDto implements CreateCategoryUseCase.Input {
  name: string;
  description?: string;
  is_active?: boolean;
}

