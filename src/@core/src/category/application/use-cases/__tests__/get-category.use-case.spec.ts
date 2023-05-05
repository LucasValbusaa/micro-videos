import { Category } from "#category/domain/entities";
import { NotFoundError } from "#shared/domain/errors";
import { CategoryInMemoryRepository } from "#category/infra/repositories";
import { GetCategoryUseCase } from "../get-category.use-case";

describe("GetCategoryUseCase Unit Tests", () => {
  let useCase: GetCategoryUseCase.UseCase;
  let repository: CategoryInMemoryRepository;

  beforeEach(() => {
    repository = new CategoryInMemoryRepository();
    useCase = new GetCategoryUseCase.UseCase(repository);
  });

  it("should throws error when entity not found", async () => {
    expect(() => useCase.execute({ id: "fake_id" })).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );
  });

  it("should returns a category", async () => {
    const items = [new Category({ name: "Movie" })];
    repository.items = items;

    const spyFindById = jest.spyOn(repository, "findById");
    let output = await useCase.execute({ id: items[0].id.value });

    expect(spyFindById).toHaveBeenCalledTimes(1);
    expect(output).toStrictEqual({
      id: items[0].id.value,
      name: "Movie",
      description: null,
      is_active: true,
      created_at: items[0].created_at,
    });
  });
});
