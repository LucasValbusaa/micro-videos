import { CategoryModel } from "../category-model";
import { Category, CategoryRepository } from "../../../../../domain";
import { CategorySequelizeRepository } from "../category-repository";
import { NotFoundError, SortDirection } from "../../../../../../@shared/domain";
import { setupSequelize } from "../../../../../../@shared/infra";
import _chance from "chance";
import { CategoryModelMapper } from "../category-mapper";

const chance = _chance();

describe("CategorySequelizeRepository Unit Test", () => {
  setupSequelize({ models: [CategoryModel] });

  let repository: CategorySequelizeRepository;

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

  it("should insert multiples entities", async () => {
    let categories = Category.fake()
      .theCategories(2)
      .withName("Movie")
      .withDescription(null)
      .withCreatedAt(null)
      .build();
    await repository.bulkInsert(categories);
    let model = await CategoryModel.findAll();

    expect(model[0].toJSON()).toStrictEqual(categories[0].toJSON());
    expect(model[1].toJSON()).toStrictEqual(categories[1].toJSON());

    categories = Category.fake().theCategories(2).build();
    await repository.bulkInsert(categories);
    model = await CategoryModel.findAll();

    expect(model[2].toJSON()).toStrictEqual(categories[0].toJSON());
    expect(model[3].toJSON()).toStrictEqual(categories[1].toJSON());
  });

  describe("findById method", () => {
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
  });

  describe("update method", () => {
    it("should throw error on update when a entity not found", async () => {
      const entity = new Category({ name: "Movie" });
      await expect(repository.update(entity)).rejects.toThrow(
        new NotFoundError(`Entity not found using ID ${entity.id}`)
      );
    });

    it("should update a entity", async () => {
      const entity = new Category({ name: "Movie" });
      await repository.insert(entity);

      entity.update({
        name: "Movie update",
        description: entity.description,
      });
      await repository.update(entity);
      const entityFound = await repository.findById(entity.id);
      expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
    });
  });

  describe("delete method", () => {
    it("should throw error on delete when a entity not found", async () => {
      await expect(repository.delete("fake_id")).rejects.toThrow(
        new NotFoundError("Entity not found using ID fake_id")
      );

      await expect(
        repository.delete("5982cad0-20d3-4b66-b648-c82c799ea2f6")
      ).rejects.toThrow(
        new NotFoundError(
          "Entity not found using ID 5982cad0-20d3-4b66-b648-c82c799ea2f6"
        )
      );
    });

    it("should delete a entity", async () => {
      const entity = new Category({ name: "Movie" });
      await repository.insert(entity);

      await repository.delete(entity.id);
      const entityFound = await CategoryModel.findByPk(entity.id.toString());

      expect(entityFound).toBeNull();
    });
  });

  it("should return all categories", async () => {
    const entity = new Category({ name: "Movie" });
    await repository.insert(entity);
    const entities = await repository.findAll();

    expect(entities).toHaveLength(1);
    expect(JSON.stringify(entities)).toStrictEqual(JSON.stringify([entity]));
  });

  it("should update a entity", async () => {});

  describe("search method tests", () => {
    it("should only apply paginate when other params are null", async () => {
      const created_at = new Date();
      await CategoryModel.factory()
        .count(16)
        .bulkCreate(() => ({
          id: chance.guid({ version: 4 }),
          name: "Movie",
          description: null,
          is_active: true,
          created_at: created_at,
        }));
      const spyToEntity = jest.spyOn(CategoryModelMapper, "toEntity");

      const searchOutput = await repository.search(
        new CategoryRepository.SearchParams()
      );
      expect(searchOutput).toBeInstanceOf(CategoryRepository.SearchResult);
      expect(spyToEntity).toHaveBeenCalledTimes(15);
      expect(searchOutput.toJSON()).toMatchObject({
        total: 16,
        current_page: 1,
        last_page: 2,
        per_page: 15,
        sort: null,
        sort_dir: null,
        filter: null,
      });
      searchOutput.toJSON().items.forEach((item) => {
        expect(item).toBeInstanceOf(Category);
        expect(item.id).toBeDefined();
      });
      const items = searchOutput.toJSON().items.map((item) => item.toJSON());
      expect(items).toMatchObject(
        new Array(15).fill({
          name: "Movie",
          description: null,
          is_active: true,
          created_at: created_at,
        })
      );
    });

    it("should order by created_at DESC when search params are null", async () => {
      const created_at = new Date();
      const models = await CategoryModel.factory()
        .count(16)
        .bulkCreate((index) => ({
          id: chance.guid({ version: 4 }),
          name: `Movie${index}`,
          description: null,
          is_active: true,
          created_at: new Date(created_at.getTime() + 100 + index),
        }));
      const searchOutput = await repository.search(
        new CategoryRepository.SearchParams()
      );
      const items = searchOutput.toJSON().items;
      [...items].reverse().forEach((item, index) => {
        expect(`${item.name}`).toBe(`${models[index + 1].name}`);
      });
    });

    it("should apply paginate and filter", async () => {
      const defaultProperties = {
        description: null,
        is_active: true,
        created_at: new Date(),
      };
      const categoriesProps = [
        { id: chance.guid({ version: 4 }), name: "test", ...defaultProperties },
        { id: chance.guid({ version: 4 }), name: "a", ...defaultProperties },
        { id: chance.guid({ version: 4 }), name: "TEST", ...defaultProperties },
        { id: chance.guid({ version: 4 }), name: "TeSt", ...defaultProperties },
      ];

      const categories = await CategoryModel.bulkCreate(categoriesProps);

      let searchOutput = await repository.search(
        new CategoryRepository.SearchParams({
          page: 1,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new CategoryRepository.SearchResult({
          items: [
            CategoryModelMapper.toEntity(categories[0]),
            CategoryModelMapper.toEntity(categories[2]),
          ],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "TEST",
        }).toJSON(true)
      );

      searchOutput = await repository.search(
        new CategoryRepository.SearchParams({
          page: 2,
          per_page: 2,
          filter: "TEST",
        })
      );
      expect(searchOutput.toJSON(true)).toMatchObject(
        new CategoryRepository.SearchResult({
          items: [CategoryModelMapper.toEntity(categories[3])],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: null,
          sort_dir: null,
          filter: "TEST",
        }).toJSON(true)
      );
    });
  });

  it("should apply paginate and sort", async () => {
    expect(repository.sortableFields).toStrictEqual(["name", "created_at"]);

    const defaultProperties = {
      description: null,
      is_active: true,
      created_at: new Date(),
    };
    const categoriesProps = [
      { id: chance.guid({ version: 4 }), name: "b", ...defaultProperties },
      { id: chance.guid({ version: 4 }), name: "a", ...defaultProperties },
      { id: chance.guid({ version: 4 }), name: "d", ...defaultProperties },
      { id: chance.guid({ version: 4 }), name: "e", ...defaultProperties },
      { id: chance.guid({ version: 4 }), name: "c", ...defaultProperties },
    ];
    const categories = await CategoryModel.bulkCreate(categoriesProps);

    const arrange = [
      {
        params: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
        }),
        result: new CategoryRepository.SearchResult({
          items: [
            CategoryModelMapper.toEntity(categories[1]),
            CategoryModelMapper.toEntity(categories[0]),
          ],
          total: 5,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: SortDirection.ASC,
          filter: null,
        }),
      },
      {
        params: new CategoryRepository.SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
        }),
        result: new CategoryRepository.SearchResult({
          items: [
            CategoryModelMapper.toEntity(categories[4]),
            CategoryModelMapper.toEntity(categories[2]),
          ],
          total: 5,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: SortDirection.ASC,
          filter: null,
        }),
      },
      {
        params: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: SortDirection.DESC,
        }),
        result: new CategoryRepository.SearchResult({
          items: [
            CategoryModelMapper.toEntity(categories[3]),
            CategoryModelMapper.toEntity(categories[2]),
          ],
          total: 5,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: SortDirection.DESC,
          filter: null,
        }),
      },
      {
        params: new CategoryRepository.SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: SortDirection.DESC,
        }),
        result: new CategoryRepository.SearchResult({
          items: [
            CategoryModelMapper.toEntity(categories[4]),
            CategoryModelMapper.toEntity(categories[0]),
          ],
          total: 5,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: SortDirection.DESC,
          filter: null,
        }),
      },
    ];

    for (const i of arrange) {
      let result = await repository.search(i.params);
      expect(result.toJSON(true)).toMatchObject(i.result.toJSON(true));
    }
  });

  describe("should search using filter, sort and paginate", () => {
    const categories = [
      Category.fake().aCategory().withName("test").build(),
      Category.fake().aCategory().withName("a").build(),
      Category.fake().aCategory().withName("TEST").build(),
      Category.fake().aCategory().withName("e").build(),
      Category.fake().aCategory().withName("TeSt").build(),
    ];

    let arrange = [
      {
        search_params: new CategoryRepository.SearchParams({
          page: 1,
          per_page: 2,
          sort: "name",
          filter: "TEST",
        }),
        search_result: new CategoryRepository.SearchResult({
          items: [categories[2], categories[4]],
          total: 3,
          current_page: 1,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        }),
      },
      {
        search_params: new CategoryRepository.SearchParams({
          page: 2,
          per_page: 2,
          sort: "name",
          filter: "TEST",
        }),
        search_result: new CategoryRepository.SearchResult({
          items: [categories[0]],
          total: 3,
          current_page: 2,
          per_page: 2,
          sort: "name",
          sort_dir: "asc",
          filter: "TEST",
        }),
      },
    ];

    beforeEach(async () => {
      await repository.bulkInsert(categories);
    });

    test.each(arrange)(
      "when value is $search_params",
      async ({ search_params, search_result }) => {
        let result = await repository.search(search_params);
        expect(result.toJSON(true)).toMatchObject(search_result.toJSON(true));
      }
    );
  });
});
