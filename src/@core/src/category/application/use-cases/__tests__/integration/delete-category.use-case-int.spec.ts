import { NotFoundError } from "../../../../../@shared/domain/errors/not-fount.error";
import { DeleteCategoryUseCase } from "../../delete-category.use-case";
import { CategoryModel, CategorySequelizeRepository } from "../../../../infra";
import { setupSequelize } from "../../../../../@shared/infra";

describe("DeleteCategoryUseCase Integration Tests", () => {
  setupSequelize({ models: [CategoryModel] });

  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake_id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );
  });

  it("should delete a category", async () => {
    const model = await CategoryModel.factory().create();
    await useCase.execute({
      id: model.id,
    });
    const noHasModel = await CategoryModel.findByPk(model.id);
    expect(noHasModel).toBeNull();
  });
});
