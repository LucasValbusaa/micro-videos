import { Category } from "../../../domain/entities/category";
import NotFoundError from "../../../../@shared/domain/errors/not-fount.error";
import { CategoryInMemoryRepository } from "../../../infra/repositories/category-in-memory.repository";
import { UpdateCategoryUseCase } from "../update-category.use-case";
import { updateCategoryParams } from "./stubs";

describe("UpdateCategoryUseCase Unit Tests", () => {
  let useCase: UpdateCategoryUseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new UpdateCategoryUseCase(repository);
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
