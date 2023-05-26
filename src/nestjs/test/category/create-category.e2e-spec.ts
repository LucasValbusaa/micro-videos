import request from "supertest";
import { CreateCategoryFixture } from "../../src/categories/fixture";
import { CategoryRepository } from "@micro-videos/core/src/category/domain";
import { CATEGORY_PROVIDERS } from "../../src/categories/categories.providers";
import { CategoriesController } from "../../src/categories/categories.controller";
import { instanceToPlain } from "class-transformer";
import { startApp } from "../../src/@shared/testing/helper";

describe("CategoriesController (e2e)", () => {
  describe("/categories (POST)", () => {
    const nestServer = startApp();
    describe("should a response error with 422 when request body is invalid", () => {
      const invalidRequest = CreateCategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)("when body is $label", ({ value }) => {
        return request(nestServer.app.getHttpServer())
          .post("/categories")
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe("should a response error with 422 when throw EntityValidationError", () => {
      const nestServer = startApp({
        beforeInit: (app) => {
          app["config"].globalPipes = [];
        },
      });
      const invalidRequest =
        CreateCategoryFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)("when body is $label", ({ value }) => {
        return request(nestServer.app.getHttpServer())
          .post("/categories")
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe("should create a category", () => {
      const nestServer = startApp();
      const arrange = CreateCategoryFixture.arrangeForSave();
      let categoryRepo: CategoryRepository.Repository;
      beforeEach(() => {
        categoryRepo = nestServer.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
      });

      test.each(arrange)(
        "when body is $send_data",
        async ({ send_data, expected }) => {
          const res = await request(nestServer.app.getHttpServer())
            .post("/categories")
            .send(send_data)
            .expect(201);

          const data = res.body.data;
          const keysInResponse = CreateCategoryFixture.keysInResponse();
          expect(Object.keys(res.body)).toStrictEqual(["data"]);
          expect(Object.keys(data)).toStrictEqual(keysInResponse);

          const categoryFound = await categoryRepo.findById(data.id);
          const presenter = CategoriesController.categoryToResponse(
            categoryFound.toJSON(),
          );
          const serialized = instanceToPlain(presenter);

          expect(data).toStrictEqual(serialized);
          expect(data).toStrictEqual({
            id: serialized.id,
            created_at: serialized.created_at,
            ...send_data,
            ...expected,
          });
        },
      );
    });
  });
});

