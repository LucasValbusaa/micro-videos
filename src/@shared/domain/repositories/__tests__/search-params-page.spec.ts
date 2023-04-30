import { SearchParams } from "../pagination/search-params-page";
import {
  stubSearchParamsNumberToValidate,
  stubSearchParamsStringToValidate,
  stubSortDirParamsValidate,
} from "./stub";

describe("SearchParams Unit Tests", () => {
  test("page prop", () => {
    expect(new SearchParams().props.page).toBe(1);
    stubSearchParamsNumberToValidate(1).forEach(({ received, expected }) => {
      expect(new SearchParams({ page: received as any }).props.page).toBe(
        expected
      );
    });
  });

  test("per_page prop", () => {
    expect(new SearchParams().props.per_page).toBe(15);
    stubSearchParamsNumberToValidate(15).forEach(({ received, expected }) => {
      expect(
        new SearchParams({ per_page: received as any }).props.per_page
      ).toBe(expected);
    });
  });

  test("per_page prop", () => {
    expect(new SearchParams().props.per_page).toBe(15);
    stubSearchParamsNumberToValidate(15).forEach(({ received, expected }) => {
      expect(
        new SearchParams({ per_page: received as any }).props.per_page
      ).toBe(expected);
    });
  });

  test("sort prop", () => {
    expect(new SearchParams().props.sort).toBeNull();
    stubSearchParamsStringToValidate.forEach(({ received, expected }) => {
      expect(new SearchParams({ sort: received as any }).props.sort).toBe(
        expected
      );
    });
  });

  test("sort_dir prop", () => {
    expect(new SearchParams().props.sort_dir).toBeNull();
    expect(new SearchParams({ sort: null }).props.sort_dir).toBeNull();
    expect(new SearchParams({ sort: undefined }).props.sort_dir).toBeNull();
    expect(new SearchParams({ sort: "" }).props.sort_dir).toBeNull();

    stubSortDirParamsValidate.forEach(({ received, expected }) => {
      expect(
        new SearchParams({ sort: "field", sort_dir: received as any }).props
          .sort_dir
      ).toBe(expected);
    });
  });

  test("filter prop", () => {
    expect(new SearchParams().props.filter).toBeNull();
    stubSearchParamsStringToValidate.forEach(({ received, expected }) => {
      expect(new SearchParams({ filter: received as any }).props.filter).toBe(
        expected
      );
    });
  });
});
