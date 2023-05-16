import { NotFoundError } from "../../../../../@shared/domain/errors/not-fount.error";
import { GetCategoryUseCase } from "../../get-category.use-case";
import { CategoryModel, CategorySequelizeRepository } from "../../../../infra";
import { setupSequelize } from "../../../../../@shared/infra";

describe("GetCategoryUseCase Integration Test", () => {
  setupSequelize({ models: [CategoryModel] });

  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    await expect(() => useCase.execute({ id: "fake_id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );
  });

  it("should returns a category", async () => {
    const entity = await CategoryModel.factory().create();

    const output = await useCase.execute({ id: entity.id.toString() });

    expect(output).toStrictEqual(entity.toJSON());
  });
});
