import { Category, CategoryProps } from "./category";
import { UniqueId } from "../../../@shared/domain/value-objects/unique-id";

describe("Category Unit Test", () => {
  const created_at = new Date();
  const mockCategoryProps: CategoryProps = {
    name: "movie",
    description: "some description",
    is_active: true,
    created_at,
  };

  const categorySut = (props: CategoryProps, id?: UniqueId): Category => {
    return new Category(props, id);
  };

  test("create an category", () => {
    const category = categorySut(mockCategoryProps);

    expect(category).toBeInstanceOf(Category);
    expect(category.name).toBe("movie");
    expect(category.description).toBe("some description");
    expect(category.is_active).toBeTruthy();
    expect(category.created_at).toBe(created_at);
  });

  test("create an category with values required", () => {
    const category = categorySut({ name: "movie", is_active: false });

    expect(category).toBeInstanceOf(Category);
    expect(category.name).toBe("movie");
    expect(category.description).toBeUndefined();
    expect(category.is_active).toBeFalsy();
    expect(category.created_at).toBeInstanceOf(Date);
  });

  test("create an category with valid id", () => {
    const data = [
      { mockCategoryProps },
      { mockCategoryProps, id: undefined },
      { mockCategoryProps, id: null },
      { mockCategoryProps, id: new UniqueId() },
    ];

    data.forEach((d) => {
      const category = categorySut(d.mockCategoryProps, d.id);
      expect(category._id).not.toBeNull();
      expect(category._id).toBeInstanceOf(UniqueId);
    });
  });
});
