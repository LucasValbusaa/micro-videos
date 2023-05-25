import { UpdateCategoryUseCase } from "@micro-videos/core/src/category/application";
import { IsBoolean, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateCategoryDto
  implements Omit<UpdateCategoryUseCase.Input, "id">
{
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsBoolean()
  @IsOptional()
  is_active?: boolean;
}
