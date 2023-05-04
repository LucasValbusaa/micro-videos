import { Category } from "../entities/category";
import { SearchableRepositoryInterface } from "#shared/domain/repositories";
import {
  SearchParams as DefaultSearchParams,
  SearchResult as DefaultSearchResult,
} from "#shared/domain/repositories/pagination";

export namespace CategoryRepository {
  export type Filter = string;

  export class SearchParams extends DefaultSearchParams<Filter> {}

  export class SearchResult extends DefaultSearchResult<Category, Filter> {}

  export interface Repository
    extends SearchableRepositoryInterface<
      Category,
      Filter,
      SearchParams,
      SearchResult
    > {}
}

export default CategoryRepository;
