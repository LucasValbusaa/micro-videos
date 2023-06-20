import { SearchResult } from "../../domain/repositories/pagination/search-result";
import { PaginationOutputDTO } from "../dto";

export class PaginationOutputMapper {
  static toOutput<Item = any, Filter = any>(
    items: Item[],
    props: SearchResult<any, Filter>
  ): PaginationOutputDTO<Item> {
    const { total, current_page, last_page, per_page } = props.toJSON();
    return {
      items,
      total: total,
      current_page: current_page,
      last_page: last_page,
      per_page: per_page,
    };
  }
}
