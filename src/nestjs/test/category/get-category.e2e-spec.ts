import request from "supertest";
import { CreateCategoryFixture } from "../../src/categories/fixture";
import {
  Category,
  CategoryRepository,
} from "@micro-videos/core/src/category/domain";
import { CATEGORY_PROVIDERS } from "../../src/categories/categories.providers";
import { instanceToPlain } from "class-transformer";
import { startApp } from "../../src/@shared/testing/helper";
import { CategoryPresenter } from "../../src/categories/presenter/category-presenter";

describe("CategoriesController (e2e)", () => {
  describe("/categories/:id (GET)", () => {
    const uuid = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
    const nestServer = startApp();

    describe("should a response error when id is invalid or not found", () => {
      const nestServer = startApp();
      const arrange = [
        {
          id: uuid,
          expected: {
            statusCode: 404,
            message: `Entity not found using ID ${uuid}`,
            error: "Not Found",
          },
        },
        {
          id: "fake id",
          expected: {
            statusCode: 400,
            message: "Validation failed (uuid  is expected)",
            error: "Bad Request",
          },
        },
      ];

      test.each(arrange)("when id is $id", ({ id, expected }) => {
        return request(nestServer.app.getHttpServer())
          .get(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it("should return a category", async () => {
      const categoryRepo = nestServer.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );

      const category = Category.fake().aCategory().build();
      const presenter = new CategoryPresenter(category.toJSON());
      await categoryRepo.insert(category);

      const res = await request(nestServer.app.getHttpServer())
        .get(`/categories/${category.id.value}`)
        .expect(200);

      const data = res.body.data;
      const keysInResponse = CreateCategoryFixture.keysInResponse();
      expect(Object.keys(res.body)).toStrictEqual(["data"]);
      expect(Object.keys(data)).toStrictEqual(keysInResponse);

      expect(data).toStrictEqual(instanceToPlain(presenter));
    });
  });
});

