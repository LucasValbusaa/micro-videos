import CategoryRepository from "#category/domain/repository/category.repository";
import { InMemorySearchableRepository } from "#shared/domain/repositories";
import { Category } from "#category/domain/entities";

export class CategoryInMemoryRepository
  extends InMemorySearchableRepository<Category>
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];

  protected async applyFilter(
    items: Category[],
    filter: CategoryRepository.Filter
  ): Promise<Category[]> {
    if (!filter) {
      return items;
    }

    return items.filter((i) => {
      return i.props.name.toLowerCase().includes(filter.toLowerCase());
    });
  }

  protected async applySort(
    items: Category[],
    sort: string,
    sort_dir: string
  ): Promise<Category[]> {
    return !sort
      ? super.applySort(items, "created_at", "desc")
      : super.applySort(items, sort, sort_dir);
  }
}
