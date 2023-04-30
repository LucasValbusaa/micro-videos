import { CategoryRepositoryInterface } from "category/contracts/category.repository";
import { InMemorySearchableRepository } from "../../../@shared/domain/repositories/in-memory-repository";
import { Category } from "../../domain/entities/category";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepositoryInterface {}
