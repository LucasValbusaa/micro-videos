import { ListCategoriesUseCase } from "../../list-categories.use-case";
import { SortDirection } from "../../../../../@shared/domain/repositories/pagination/search-params";
import { CategoryModel, CategorySequelizeRepository } from "../../../../infra";
import { setupSequelize } from "../../../../../@shared/infra";
import _chance from "chance";

const chance = _chance();

describe("ListCategoriesUseCase Integration Tests", () => {
  setupSequelize({ models: [CategoryModel] });

  let useCase: ListCategoriesUseCase.UseCase;
  let repository: CategorySequelizeRepository;

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new ListCategoriesUseCase.UseCase(repository);
  });

  it("should returns output using empty input with category ordered by created_at", async () => {
    const models = await CategoryModel.factory()
      .count(2)
      .bulkCreate((index: number) => {
        return {
          id: chance.guid({ version: 4 }),
          name: `Movie-${index}`,
          description: "some description",
          is_active: true,
          created_at: new Date(new Date().getTime() + index),
        };
      });

    const output = await useCase.execute({});
    expect(output).toStrictEqual({
      items: [...models.reverse().map((i) => i.toJSON())],
      total: 2,
      current_page: 1,
      per_page: 15,
      last_page: 1,
    });
  });

  it("should returns output using pagination, sort and filter", async () => {
    const names = ["a", "AAA", "AaA", "b", "c"];
    const models = CategoryModel.factory().count(5).bulkMake();
    names.forEach((name, index) => {
      models[index].name = name;
    });

    await CategoryModel.bulkCreate(models.map((m) => m.toJSON()));

    let output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [models[1].toJSON(), models[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 2,
      per_page: 2,
      sort: "name",
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [models[0].toJSON()],
      total: 3,
      current_page: 2,
      per_page: 2,
      last_page: 2,
    });

    output = await useCase.execute({
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: SortDirection.DESC,
      filter: "a",
    });
    expect(output).toStrictEqual({
      items: [models[0].toJSON(), models[2].toJSON()],
      total: 3,
      current_page: 1,
      per_page: 2,
      last_page: 2,
    });
  });
});
