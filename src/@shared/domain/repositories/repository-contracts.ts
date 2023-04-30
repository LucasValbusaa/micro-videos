import { Entity } from "../entity/entity";
import { UniqueId } from "../value-object/unique-id";
import { SearchParams } from "./pagination/search-params";
import { SearchResult } from "./pagination/search-result";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueId): Promise<void>;
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  Filter = string,
  SearchInput = SearchParams,
  SearchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
