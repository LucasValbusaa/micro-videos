import { SearchResult } from "#shared/domain/repositories/pagination";
import { PaginationOutputDTO } from "../dto";

export class PaginationOutputMapper {
  static toOutput(
    searchResult: SearchResult
  ): Omit<PaginationOutputDTO, "items"> {
    const result = searchResult.toJSON();
    return {
      total: result.total,
      current_page: result.current_page,
      last_page: result.last_page,
      per_page: result.per_page,
    };
  }
}
