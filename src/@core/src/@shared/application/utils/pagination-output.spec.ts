import { SearchResult } from "#shared/domain/repositories/pagination";
import { PaginationOutputMapper } from "./pagination-output";

describe("PaginationOutputMapper", () => {
  it("should convert a SearchResult in output", () => {
    const result = new SearchResult({
      items: ["fake"] as any,
      total: 1,
      current_page: 1,
      per_page: 1,
      sort: null,
      sort_dir: null,
      filter: null,
    });

    const output = PaginationOutputMapper.toOutput(result);

    expect(output).toStrictEqual({
      total: 1,
      current_page: 1,
      last_page: 1,
      per_page: 1,
    });
  });
});
