import { Test, TestingModule } from "@nestjs/testing";
import { CategoriesController } from "../../../categories/categories.controller";
import { CategoriesModule } from "../../../categories/categories.module";
import { ConfigModule } from "../../../config/config.module";
import { DatabaseModule } from "../../../database/database.module";
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from "../../presenter/category-presenter";
import { CATEGORY_PROVIDERS } from "../../../categories/categories.providers";
import {
  NotFoundError,
  SearchDirection,
} from "@micro-videos/core/src/@shared/domain";
import {
  Category,
  CategoryRepository,
} from "@micro-videos/core/src/category/domain";
import {
  CreateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
  UpdateCategoryUseCase,
} from "@micro-videos/core/src/category/application";
import { CreateCategoryFixture } from "../../fixture";

describe("CategoriesController Integration Tests", () => {
  let controller: CategoriesController;
  let repository: CategoryRepository.Repository;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot(), DatabaseModule, CategoriesModule],
    }).compile();

    controller = module.get(CategoriesController);
    repository = module.get(
      CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
    );
  });

  it("should be defined", () => {
    expect(controller).toBeDefined();
    expect(controller["createUseCase"]).toBeInstanceOf(
      CreateCategoryUseCase.UseCase,
    );
    expect(controller["updateUseCase"]).toBeInstanceOf(
      UpdateCategoryUseCase.UseCase,
    );
    expect(controller["deleteUseCase"]).toBeInstanceOf(
      DeleteCategoryUseCase.UseCase,
    );
    expect(controller["getUseCase"]).toBeInstanceOf(GetCategoryUseCase.UseCase);
    expect(controller["listUseCase"]).toBeInstanceOf(
      ListCategoriesUseCase.UseCase,
    );
  });

  describe("should create a category", () => {
    const arrange = CreateCategoryFixture.arrangeForSave();

    test.each(arrange)(
      "whit request $request",
      async ({ send_data, expected }) => {
        const presenter = await controller.create(send_data);
        const entity = await repository.findById(presenter.id);

        expect(entity.toJSON()).toStrictEqual({
          id: presenter.id,
          created_at: presenter.created_at,
          ...expected,
          ...send_data,
        });

        expect(presenter).toEqual(new CategoryPresenter(entity.toJSON()));
      },
    );
  });
  describe("should update a category", () => {
    const category = Category.fake().aCategory().build();
    beforeEach(async () => {
      await repository.insert(category);
    });
    const arrange = [
      {
        request: {
          name: "Movie",
        },
      },
      {
        request: {
          name: "Movie",
          description: null,
        },
      },
      {
        request: {
          name: "Movie",
          is_active: false,
        },
      },
      {
        request: {
          name: "Movie",
          is_active: true,
        },
      },
      {
        request: {
          name: "Movie",
          description: "some description",
        },
      },
    ];

    test.each(arrange)("whit request $request", async ({ request }) => {
      const presenter = await controller.update(category.id.value, request);
      const entity = await repository.findById(presenter.id);

      expect(entity.toJSON()).toMatchObject(presenter);
      expect(presenter).toBeInstanceOf(CategoryPresenter);
      expect(presenter.toJson()).toStrictEqual(entity.toJSON());
    });
  });

  it("should delete a category", async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    const response = await controller.delete(category.id.value);

    expect(response).toBeUndefined();
    expect(repository.findById(category.id)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${category.id}`),
    );
  });

  it("should get a category", async () => {
    const category = Category.fake().aCategory().build();
    await repository.insert(category);
    const presenter = await controller.findOne(category.id.value);

    expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter.toJson()).toStrictEqual(category.toJSON());
  });

  describe("search method", () => {
    it("should returns categories using query empty ordered by created_at", async () => {
      const categories = Category.fake()
        .theCategories(4)
        .withName((index) => index + "")
        .withCreatedAt((index) => new Date(new Date().getTime() + index))
        .build();
      await repository.bulkInsert(categories);

      const arrange = [
        {
          send_data: {},
          expect: {
            items: [
              categories[3].toJSON(),
              categories[2].toJSON(),
              categories[1].toJSON(),
              categories[0].toJSON(),
            ],
            current_page: 1,
            last_page: 1,
            per_page: 15,
            total: 4,
          },
        },
        {
          send_data: { per_page: 2 },
          expect: {
            items: [categories[3].toJSON(), categories[2].toJSON()],
            current_page: 1,
            last_page: 2,
            per_page: 2,
            total: 4,
          },
        },
        {
          send_data: { page: 2, per_page: 2 },
          expect: {
            items: [categories[1].toJSON(), categories[0].toJSON()],
            current_page: 2,
            last_page: 2,
            per_page: 2,
            total: 4,
          },
        },
      ];

      for (const item of arrange) {
        const presenter = await controller.search(item.send_data);
        expect(presenter).toEqual(new CategoryCollectionPresenter(item.expect));
      }
    });

    it("should returns output using pagination, sort and filter", async () => {
      const faker = Category.fake().aCategory();
      const categories = [
        faker.withName("a").build(),
        faker.withName("AAA").build(),
        faker.withName("AaA").build(),
        faker.withName("b").build(),
        faker.withName("c").build(),
      ];
      await repository.bulkInsert(categories);

      const arrange_asc = [
        {
          send_data: {
            page: 1,
            per_page: 2,
            sort: "name",
            filter: "a",
          },
          expect: {
            items: [categories[1].toJSON(), categories[2].toJSON()],
            current_page: 1,
            last_page: 2,
            per_page: 2,
            total: 3,
          },
        },
        {
          send_data: {
            page: 2,
            per_page: 2,
            sort: "name",
            filter: "a",
          },
          expect: {
            items: [categories[0].toJSON()],
            current_page: 2,
            last_page: 2,
            per_page: 2,
            total: 3,
          },
        },
      ];

      for (const item of arrange_asc) {
        const presenter = await controller.search(item.send_data);
        expect(presenter).toEqual(new CategoryCollectionPresenter(item.expect));
      }

      const arrange_desc = [
        {
          send_data: {
            page: 1,
            per_page: 2,
            sort: "name",
            sort_dir: SearchDirection.DESC,
            filter: "a",
          },
          expect: {
            items: [categories[0].toJSON(), categories[2].toJSON()],
            current_page: 1,
            last_page: 2,
            per_page: 2,
            total: 3,
          },
        },
        {
          send_data: {
            page: 2,
            per_page: 2,
            sort: "name",
            sort_dir: SearchDirection.DESC,
            filter: "a",
          },
          expect: {
            items: [categories[1].toJSON()],
            current_page: 2,
            last_page: 2,
            per_page: 2,
            total: 3,
          },
        },
      ];

      for (const item of arrange_desc) {
        const presenter = await controller.search(item.send_data);
        expect(presenter).toEqual(new CategoryCollectionPresenter(item.expect));
      }
    });
  });
});
