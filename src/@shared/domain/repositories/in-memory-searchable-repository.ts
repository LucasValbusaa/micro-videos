import { Entity } from "../entity/entity";
import { InMemoryRepository } from "./in-memory-repository";
import { SearchDirection, SearchParams } from "./pagination/search-params";
import { SearchResult } from "./pagination/search-result";
import { SearchableRepositoryInterface } from "./repository-contracts";

export abstract class InMemorySearchableRepository<E extends Entity>
  extends InMemoryRepository<E>
  implements SearchableRepositoryInterface<E>
{
  sortableFields: string[] = [];
  async search({ props }: SearchParams): Promise<SearchResult<E>> {
    const itemsFilter = await this.applyFilter(this.items, props.filter);
    const itemsSorted = await this.applySort(
      itemsFilter,
      props.sort,
      props.sort_dir
    );
    const itemsPaginated = await this.applyPaginate(
      itemsSorted,
      props.page,
      props.per_page
    );

    return new SearchResult({
      items: itemsPaginated,
      total: itemsFilter.length,
      current_page: props.page,
      per_page: props.per_page,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }

  protected abstract applyFilter(
    items: E[],
    filter: string | null
  ): Promise<E[]>;

  protected async applySort(
    items: E[],
    sort: string | null,
    sort_dir: string | null
  ): Promise<E[]> {
    if (!sort || !this.sortableFields.includes(sort)) {
      return items;
    }

    return [...items].sort((a, b) => {
      if (a._props[sort] < b._props[sort]) {
        return sort_dir == SearchDirection.ASC ? -1 : 1;
      }
      if (a._props[sort] < b._props[sort]) {
        return sort_dir == SearchDirection.ASC ? 1 : -1;
      }

      return 0;
    });
  }

  protected async applyPaginate(
    items: E[],
    page: number,
    per_page: number
  ): Promise<E[]> {
    const start = (page - 1) * per_page;
    const limit = start + per_page;
    return items.slice(start, limit);
  }
}
