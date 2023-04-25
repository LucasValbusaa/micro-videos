import { UniqueId } from "../../../@shared/domain/value-object/unique-id";
import { Category, CategoryProps } from "./category";

const createdAtInstance = new Date();
function stubCategoryProps(): CategoryProps {
  return {
    name: "Movie",
    description: "some description",
    created_at: createdAtInstance,
    is_active: true,
  };
}

describe("Category Entity Test", () => {
  describe("constructor of category", () => {
    it("should validate id field", () => {
      const props = [
        {},
        { id: null },
        { id: undefined },
        { id: new UniqueId() },
      ];

      props.forEach((i) => {
        const category = new Category(stubCategoryProps(), i.id);
        expect(category.id).not.toBeNull();
        expect(category.id).toBeInstanceOf(UniqueId);
      });
    });

    it("should return all fields of category constructor", () => {
      const category = new Category(stubCategoryProps());
      expect({
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at,
      }).toStrictEqual(stubCategoryProps());
    });

    it("should return true when is_active is not pass", () => {
      const { is_active, ...stub } = stubCategoryProps();

      const category = new Category(stub);
      expect({
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at,
      }).toStrictEqual({
        is_active: true,
        ...stub,
      });
    });

    it("should return null when description is not pass", () => {
      const { description, ...stub } = stubCategoryProps();

      const category = new Category(stub);
      expect({
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at,
      }).toStrictEqual({ description: null, ...stub });
    });

    it("should return true when is_active is not pass", () => {
      const { created_at, ...stub } = stubCategoryProps();

      const category = new Category(stub);
      expect({
        name: category.name,
        description: category.description,
        is_active: category.is_active,
        created_at: category.created_at,
      }).toStrictEqual({ created_at: createdAtInstance, ...stub });
    });
  });
});
