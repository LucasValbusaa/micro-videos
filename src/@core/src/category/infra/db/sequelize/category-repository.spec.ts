import { CategoryModel } from "./category-model";
import { Category } from "../../../domain";
import { CategorySequelizeRepository } from "./category-repository";
import { NotFoundError } from "../../../../@shared/domain";
import { setupSequelize } from "../../../../@shared/infra/";

describe("CategorySequelizeRepository Unit Test", () => {
  let repository: CategorySequelizeRepository;
  setupSequelize({ models: [CategoryModel] });

  beforeEach(async () => {
    repository = new CategorySequelizeRepository(CategoryModel);
  });

  it("should insert a new entity", async () => {
    let category = new Category({ name: "Movie" });
    await repository.insert(category);
    let model = await CategoryModel.findByPk(category.id.toString());
    expect(model.toJSON()).toStrictEqual(category.toJSON());

    category = new Category({
      name: "Movie",
      description: "Some description",
      is_active: true,
    });
    await repository.insert(category);
    model = await CategoryModel.findByPk(category.id.toString());
    expect(model.toJSON()).toStrictEqual(category.toJSON());
  });

  it("should throws error when entity not found", async () => {
    await expect(repository.findById("fake_id")).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );

    await expect(
      repository.findById("5982cad0-20d3-4b66-b648-c82c799ea2f6")
    ).rejects.toThrow(
      new NotFoundError(
        "Entity not found using ID 5982cad0-20d3-4b66-b648-c82c799ea2f6"
      )
    );
  });

  it("should find entity by id", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);

    const entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all categories", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);
    const entities = await repository.findAll();

    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toStrictEqual(JSON.stringify([entity]));
  });

  it("search", async () => {
    await CategoryModel.factory().create();
    console.log(await CategoryModel.findAll());
  });
});
