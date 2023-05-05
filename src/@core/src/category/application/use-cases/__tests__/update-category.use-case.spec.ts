import { Category } from "#category/domain/entities";
import { NotFoundError } from "#shared/domain/errors";
import { CategoryInMemoryRepository } from "#category/infra/repositories";
import { UpdateCategoryUseCase } from "../update-category.use-case";
import { updateCategoryParams } from "./stubs";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() =>
      useCase.execute({ id: "fake_id", name: "fake" })
    ).rejects.toThrow(new NotFoundError("Entity not found using ID fake_id"));
  });

  it("should update a category", async () => {
    const spyUpdate = jest.spyOn(repository, "update");
    const entity = new Category({ name: "Movie" });
    repository.items = [entity];

    const stubs = updateCategoryParams(entity.id.value, repository.items[0]);
    let count = 0;
    for (const value of stubs) {
      const updatedValue = await useCase.execute(value.input);
      expect(spyUpdate).toHaveBeenCalledTimes(++count);
      expect(updatedValue).toStrictEqual(value.expected);
    }
  });
});
