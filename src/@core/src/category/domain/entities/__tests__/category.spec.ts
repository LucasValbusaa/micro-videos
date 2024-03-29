import { UniqueId } from "../../../../@shared/domain/value-object/unique-id";
import { Category, CategoryProps } from "../category";

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
  beforeEach(() => {
    Category.validate = jest.fn();
  });
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
      expect(Category.validate).toHaveBeenCalled();
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

  describe("update", () => {
    it("should update name or description", () => {
      const category = new Category(stubCategoryProps());

      category.update({ name: "New Movie", description: "New description" });

      expect(Category.validate).toHaveBeenCalledTimes(2);
      expect(category.description).toBe("New description");
      expect(category.name).toBe("New Movie");
    });
  });

  describe("activate", () => {
    it("should be turn is_active true when function is called", () => {
      const stubDeactivate = {
        name: "Movie",
        is_active: false,
      };
      const category = new Category(stubDeactivate);
      category.activate();

      expect(category.is_active).toBeTruthy();
    });
  });

  describe("deactivate", () => {
    it("should be turn is_active false when function is called", () => {
      const category = new Category(stubCategoryProps());
      category.deactivate();

      expect(category.is_active).toBeFalsy();
    });
  });
});
