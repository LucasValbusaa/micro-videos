import { Category } from "#category/domain/entities";
import { NotFoundError } from "#shared/domain/errors";
import { CategoryInMemoryRepository } from "#category/infra/repositories";
import { DeleteCategoryUseCase } from "../delete-category.use-case";

describe("DeleteCategoryUseCase Unit Tests", () => {
  let useCase: DeleteCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new DeleteCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake_id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );
  });

  it("should delete a category", async () => {
    const items = [new Category({ name: "test" })];
    repository.items = items;

    await useCase.execute({
      id: items[0].id.value,
    });

    expect(repository.items).toHaveLength(0);
  });
});