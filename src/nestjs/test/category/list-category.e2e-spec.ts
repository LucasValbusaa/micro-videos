import request from "supertest";
import { ListCategoriesFixture } from "../../src/categories/fixture";
import { CategoryRepository } from "@micro-videos/core/src/category/domain";
import { CATEGORY_PROVIDERS } from "../../src/categories/categories.providers";
import { startApp } from "../../src/@shared/testing/helper";
import { CategoriesController } from "../../src/categories/categories.controller";

describe("CategoriesController (e2e)", () => {
  describe("/categories (GET)", () => {
    const nestServer = startApp();

    describe("should return categories sorted by created_at when request query is empty", () => {
      let categoryRepo: CategoryRepository.Repository;
      beforeEach(async () => {
        categoryRepo = nestServer.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );

        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      const { arrange, entitiesMap } =
        ListCategoriesFixture.arrangeIncrementedWithCreatedAt();

      test.each(arrange)(
        "when query params is $send_data",
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();

          return request(nestServer.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                CategoriesController.categoryToResponse(e.toJSON()),
              ),
              meta: expected.meta,
            });
        },
      );
    });
    describe("should return categories using paginate, filter and sort", () => {
      let categoryRepo: CategoryRepository.Repository;
      beforeEach(async () => {
        categoryRepo = nestServer.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );

        await categoryRepo.bulkInsert(Object.values(entitiesMap));
      });

      const { arrange, entitiesMap } = ListCategoriesFixture.arrangeUnsorted();

      test.each([arrange[0]])(
        "when query params is $send_data",
        async ({ send_data, expected }) => {
          const queryParams = new URLSearchParams(send_data as any).toString();

          return request(nestServer.app.getHttpServer())
            .get(`/categories/?${queryParams}`)
            .expect(200)
            .expect({
              data: expected.entities.map((e) =>
                CategoriesController.categoryToResponse(e.toJSON()),
              ),
              meta: expected.meta,
            });
        },
      );
    });
  });
});

