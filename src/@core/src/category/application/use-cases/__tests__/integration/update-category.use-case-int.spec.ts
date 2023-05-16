import { NotFoundError } from "../../../../../@shared/domain/errors/not-fount.error";
import { UpdateCategoryUseCase } from "../../update-category.use-case";
import { updateCategoryParams } from "../stubs";
import { CategoryModel, CategorySequelizeRepository } from "../../../../infra";
import { setupSequelize } from "../../../../../@shared/infra";

describe("UpdateCategoryUseCase Integration Tests", () => {
  setupSequelize({ models: [CategoryModel] });

  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() =>
      useCase.execute({ id: "fake_id", name: "fake" })
    ).rejects.toThrow(new NotFoundError("Entity not found using ID fake_id"));
  });

  it("should update a category", async () => {
    const model = await CategoryModel.factory().create();

    const stubs = updateCategoryParams(model.id, model);
    for (const value of stubs) {
      const updatedValue = await useCase.execute(value.input);
      expect(updatedValue).toStrictEqual(value.expected);
    }
  });
});
