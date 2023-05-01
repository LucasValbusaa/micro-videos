import { Entity } from "../../entity/entity";

export type SearchResultProps<E extends Entity, Filter = string> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: Filter;
};

export class SearchResult<E extends Entity, Filter = string> {
  readonly last_page: number;

  constructor(private props: SearchResultProps<E, Filter>) {
    this.last_page = Math.ceil(this.props.total / this.props.per_page);
  }

  toJSON() {
    return {
      ...this.props,
    };
  }
}