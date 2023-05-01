import { Category } from "category/domain/entities/category";
import { SearchableRepositoryInterface } from "../../../@shared/domain/repositories/repository-contracts";

export interface CategoryRepositoryInterface
  extends SearchableRepositoryInterface<Category, any, any> {}
