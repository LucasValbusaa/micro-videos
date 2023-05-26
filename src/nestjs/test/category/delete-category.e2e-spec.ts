import request from "supertest";
import {
  Category,
  CategoryRepository,
} from "@micro-videos/core/src/category/domain";
import { CATEGORY_PROVIDERS } from "../../src/categories/categories.providers";
import { startApp } from "../../src/@shared/testing/helper";
import { NotFoundError } from "@micro-videos/core/src/@shared/domain";

describe("CategoriesController (e2e)", () => {
  describe("/delete/:id (DELETE)", () => {
    const uuid = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
    const nestServer = startApp();

    describe("should a response error when id is invalid or not found", () => {
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
          .delete(`/categories/${id}`)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    it("should delete a category response with status 204", async () => {
      const categoryRepo = nestServer.app.get<CategoryRepository.Repository>(
        CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
      );
      const category = Category.fake().aCategory().build();
      await categoryRepo.insert(category);

      await request(nestServer.app.getHttpServer())
        .delete(`/categories/${category.id}`)
        .expect(204);

      await expect(categoryRepo.findById(category.id)).rejects.toThrow(
        new NotFoundError(`Entity not found using ID ${category.id}`),
      );
    });
  });
});

