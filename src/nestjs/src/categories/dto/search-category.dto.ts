import { SearchDirection } from "@micro-videos/core/src/@shared/domain/repositories/pagination";
import { ListCategoriesUseCase } from "@micro-videos/core/src/category/application";

export class SearchCategoryDto implements ListCategoriesUseCase.Input {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SearchDirection;
  filter?: string;
}

