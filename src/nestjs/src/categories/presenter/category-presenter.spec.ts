import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from "./category-presenter";
import { instanceToPlain } from "class-transformer";
import {
  makeInputDataPresenter,
  makeInputMetaPresenter,
  makeInputMetaPresenterAsString,
} from "../../@shared/presenters/__tests__/stub";
import { PaginationPresenter } from "../../@shared/presenters/pagination.presenter";

describe("CategoryPresenter Unit Test", () => {
  const created_at = new Date();
  const input = {
    id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
    name: "Movie",
    description: "some description",
    is_active: true,
    created_at,
  };
  it("should set values", () => {
    const presenter = new CategoryPresenter(input);
    expect(presenter.toJson()).toStrictEqual(input);
  });

  it("should presenter data", () => {
    const presenter = new CategoryPresenter(input);
    const data = instanceToPlain(presenter);
    expect(data).toStrictEqual({
      ...input,
      created_at: created_at.toISOString(),
    });
  });
});

describe("CategoryCollectionPresenter Unit Test", () => {
  it("should set value", () => {
    const created_at = new Date();
    const presenter = new CategoryCollectionPresenter({
      items: [makeInputDataPresenter(created_at)],
      ...makeInputMetaPresenter(),
    });

    expect(presenter.meta).toBeInstanceOf(PaginationPresenter);
    expect(presenter.meta).toStrictEqual(
      new PaginationPresenter(makeInputMetaPresenter()),
    );
    expect(presenter.data).toStrictEqual([
      new CategoryPresenter(makeInputDataPresenter(created_at)),
    ]);
  });

  it("should presenter data", () => {
    const created_at = new Date();
    let presenter = new CategoryCollectionPresenter({
      items: [makeInputDataPresenter(created_at)],
      ...makeInputMetaPresenter(),
    });

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: makeInputMetaPresenter(),
      data: [
        {
          ...makeInputDataPresenter(),
          created_at: created_at.toISOString(),
        },
      ],
    });

    presenter = new CategoryCollectionPresenter({
      items: [makeInputDataPresenter(created_at)],
      ...makeInputMetaPresenterAsString(),
    });

    expect(instanceToPlain(presenter)).toStrictEqual({
      meta: makeInputMetaPresenter(),
      data: [
        {
          ...makeInputDataPresenter(),
          created_at: created_at.toISOString(),
        },
      ],
    });
  });
});

