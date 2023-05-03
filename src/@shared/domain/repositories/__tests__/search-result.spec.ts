import { SearchResult, SearchResultProps } from "../pagination/search-result";

describe("SearchResult Unit Tests", () => {
  let stubResult: SearchResultProps<any, any>;

  beforeEach(() => {
    stubResult = {
      items: ["entity1", "entity2"] as any,
      total: 4,
      current_page: 1,
      per_page: 2,
      sort: "field",
      sort_dir: "asc",
      filter: "filter",
    };
  });

  test("construct props", () => {
    type stubWithFieldsNullProps = SearchResultProps<any, any> & {
      last_page: number;
      sort: string | null;
      sort_dir: string | null;
      filter: string | null;
    };

    let result = new SearchResult(stubResult);

    expect(result.toJSON()).toStrictEqual({ last_page: 2, ...stubResult });

    const stubWithFieldsNull: stubWithFieldsNullProps = {
      ...stubResult,
      last_page: 2,
      sort: null,
      sort_dir: null,
      filter: null,
    };
    result = new SearchResult(stubWithFieldsNull);
    expect(result.toJSON()).toStrictEqual(stubWithFieldsNull);
  });

  it("should set last_page = 1 when per_page field is grater than total field", () => {
    const result = new SearchResult({ ...stubResult, total: 4, per_page: 15 });
    expect(result.last_page).toBe(1);
  });

  test("when total is not multiple of per_page", () => {
    const result = new SearchResult({
      ...stubResult,
      total: 101,
      per_page: 20,
    });
    expect(result.last_page).toBe(6);
  });
});
