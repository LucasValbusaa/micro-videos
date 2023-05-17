import { CategoryModel } from "../category-model";
import { CategoryModelMapper } from "../category-mapper";
import { LoadEntityError, UniqueId } from "../../../../../../@shared/domain";
import { Category } from "../../../../../domain";
import { setupSequelize } from "../../../../../../@shared/infra";

describe("CategoryModelMapper Unit Test", () => {
  setupSequelize({ models: [CategoryModel] });

  it("should throws error when category is invalid", () => {
    const model = CategoryModel.build({
      id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
    });
    try {
      CategoryModelMapper.toEntity(model);
    } catch (e) {
      expect(e).toBeInstanceOf(LoadEntityError);
      expect(e.error).toStrictEqual({
        name: [
          "name should not be empty",
          "name must be a string",
          "name must be shorter than or equal to 255 characters",
        ],
      });
    }
  });

  it("should throw a generic error", () => {
    const error = new Error("Generic Error");
    const spyValidate = jest
      .spyOn(Category, "validate")
      .mockImplementation(() => {
        throw error;
      });

    const model = CategoryModel.build({
      id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
    });

    expect(() => CategoryModelMapper.toEntity(model)).toThrow(error);
    expect(spyValidate).toHaveBeenCalled();
    spyValidate.mockRestore();
  });

  it("should convert a category model to a category entity", () => {
    const created_at = new Date();
    const model = CategoryModel.build({
      id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
      name: "Movie",
      description: "Some description",
      is_active: true,
      created_at,
    });
    const entity = CategoryModelMapper.toEntity(model);
    const expectedCategory = new Category(
      {
        name: "Movie",
        description: "Some description",
        is_active: true,
        created_at,
      },
      new UniqueId("5982cad0-20d3-4b66-b648-c82c799ea2f6")
    );

    expect(entity.toJSON()).toStrictEqual(expectedCategory.toJSON());
  });
});
