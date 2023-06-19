import { Entity } from "../entity";
import { ValueObject } from "../value-object";
import { SearchParams } from "./pagination";
import { SearchResult } from "./pagination";

export interface RepositoryInterface<
  E extends Entity,
  EntityId extends ValueObject
> {
  insert(entity: E): Promise<void>;
  bulkInsert(entities: E[]): Promise<void>;
  findById(id: string | EntityId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | EntityId): Promise<void>;
}

export interface SearchableRepositoryInterface<
  E extends Entity,
  EntityId extends ValueObject,
  Filter = string,
  SearchInput = SearchParams<Filter>,
  SearchOutput = SearchResult<E, Filter>
> extends RepositoryInterface<E, EntityId> {
  sortableFields: string[];
  search(props: SearchInput): Promise<SearchOutput>;
}
