import { Entity } from "../../entity";

export type SearchResultProps<E extends Entity, Filter = string> = {
  items: E[];
  total: number;
  current_page: number;
  per_page: number;
  sort: string | null;
  sort_dir: string | null;
  filter: Filter;
};

export class SearchResult<E extends Entity = Entity, Filter = string> {
  readonly last_page: number;

  constructor(private props: SearchResultProps<E, Filter>) {
    this.last_page = Math.ceil(this.props.total / this.props.per_page);
  }

  toJSON(forceEntity = false) {
    return {
      ...this.props,
      items: forceEntity
        ? this.props.items.map((item) => item.toJSON())
        : this.props.items,
      last_page: this.last_page,
      filter: this.props.filter as any,
    };
  }
}
