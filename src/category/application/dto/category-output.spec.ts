import { Category } from "#category/domain/entities";
import { CategoryOutputMapper } from "./category-output";

describe("CategoryOutputMapper", () => {
  it("should convert a category in output", () => {
    const createdAtInstance = new Date();
    const entity = new Category({
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: createdAtInstance,
    });
    const spyToJson = jest.spyOn(entity, "toJSON");
    const output = CategoryOutputMapper.toOutput(entity);

    expect(spyToJson).toHaveBeenCalled();
    expect(output).toStrictEqual({
      id: entity.id.value,
      name: "Movie",
      description: "some description",
      is_active: true,
      created_at: createdAtInstance,
    });
  });
});
