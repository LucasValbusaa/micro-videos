import { instanceToPlain } from "class-transformer";
import { CollectionPresenter } from "../collection.presenter";
import { PaginationPresenter } from "../pagination.presenter";
import {
  makeInputDataPresenter,
  makeInputMetaPresenter,
  makeInputMetaPresenterAsString,
} from "./stub";

describe("CollectionPresenter Unit Test", () => {
  const created_at = new Date();

  class StubPaginationPresenter extends CollectionPresenter {
    data = [makeInputDataPresenter(created_at)];
  }

  it("should set values", () => {
    const presenter = new StubPaginationPresenter(makeInputMetaPresenter());

    expect(presenter["paginationPresenter"]).toBeInstanceOf(
      PaginationPresenter,
    );
    expect(presenter["paginationPresenter"].current_page).toBe(1);
    expect(presenter["paginationPresenter"].per_page).toBe(2);
    expect(presenter["paginationPresenter"].last_page).toBe(3);
    expect(presenter["paginationPresenter"].total).toBe(4);
    expect(presenter.meta).toEqual(presenter["paginationPresenter"]);
  });

  it("should set string number values", () => {
    const presenter = new StubPaginationPresenter(
      makeInputMetaPresenterAsString(),
    );

    expect(presenter["paginationPresenter"].current_page).toBe("1");
    expect(presenter["paginationPresenter"].per_page).toBe("2");
    expect(presenter["paginationPresenter"].last_page).toBe("3");
    expect(presenter["paginationPresenter"].total).toBe("4");
  });

  it("should presenter data", () => {
    let presenter = new StubPaginationPresenter(makeInputMetaPresenter());

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: makeInputMetaPresenter(),
      data: [makeInputDataPresenter(created_at)],
    });

    presenter = new StubPaginationPresenter(makeInputMetaPresenterAsString());

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: makeInputMetaPresenter(),
      data: [makeInputDataPresenter(created_at)],
    });
  });
});

