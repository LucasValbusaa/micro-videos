import { UpdateCategoryUseCase } from "@micro-videos/core/src/category/application";

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, "id">
{
  name: string;
  description?: string;
  is_active?: boolean;
}

