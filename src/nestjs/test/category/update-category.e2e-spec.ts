import { Test, TestingModule } from "@nestjs/testing";
import { INestApplication } from "@nestjs/common";
import request from "supertest";
import { AppModule } from "./../../src/app.module";
import {
  CreateCategoryFixture,
  UpdateCategoryFixture,
} from "../../src/categories/fixture";
import {
  Category,
  CategoryRepository,
} from "@micro-videos/core/src/category/domain";
import { CATEGORY_PROVIDERS } from "../../src/categories/categories.providers";
import { CategoriesController } from "../../src/categories/categories.controller";
import { instanceToPlain } from "class-transformer";
import { applyGlobalConfig } from "../../src/global-configs";

function startApp({
  beforeInit,
}: { beforeInit?: (app: INestApplication) => void } = {}) {
  let _app: INestApplication;

  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    _app = moduleFixture.createNestApplication();
    applyGlobalConfig(_app);
    beforeInit && beforeInit(_app);
    await _app.init();
  });

  return {
    get app() {
      return _app;
    },
  };
}

describe("CategoriesController (e2e)", () => {
  const uuid = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
  describe("PUT /categories/:id", () => {
    const nestServer = startApp();
    describe("should a response error with 422 when request body is invalid", () => {
      const invalidRequest = CreateCategoryFixture.arrangeInvalidRequest();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)("when body is $label", ({ value }) => {
        return request(nestServer.app.getHttpServer())
          .put(`/categories/${uuid}`)
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
      let categoryRepo: CategoryRepository.Repository;
      beforeEach(() => {
        categoryRepo = nestServer.app.get<CategoryRepository.Repository>(
          CATEGORY_PROVIDERS.REPOSITORIES.CATEGORY_REPOSITORY.provide,
        );
      });

      const invalidRequest =
        UpdateCategoryFixture.arrangeForEntityValidationError();
      const arrange = Object.keys(invalidRequest).map((key) => ({
        label: key,
        value: invalidRequest[key],
      }));
      test.each(arrange)("when body is $label", async ({ value }) => {
        const categoryCreated = Category.fake().aCategory().build();
        await categoryRepo.insert(categoryCreated);

        return request(nestServer.app.getHttpServer())
          .put(`/categories/${categoryCreated.id}`)
          .send(value.send_data)
          .expect(422)
          .expect(value.expected);
      });
    });

    describe("should a response error when id is invalid or not found", () => {
      const nestServer = startApp();
      const arrange = [
        {
          id: uuid,
          send_data: { name: "test" },
          expected: {
            statusCode: 404,
            message: `Entity not found using ID ${uuid}`,
            error: "Not Found",
          },
        },
        // {
        //   id: "fake id",
        //   send_data: { name: "test" },
        //   expected: {
        //     statusCode: 400,
        //     message: "Validation failed (uuid is expected)",
        //     error: "Bad Request",
        //   },
        // },
      ];

      test.each(arrange)("when id is $id", ({ id, send_data, expected }) => {
        return request(nestServer.app.getHttpServer())
          .put(`/categories/${id}`)
          .send(send_data)
          .expect(expected.statusCode)
          .expect(expected);
      });
    });

    describe("should update a category", () => {
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
          const categoryCreated = Category.fake().aCategory().build();
          await categoryRepo.insert(categoryCreated);

          const res = await request(nestServer.app.getHttpServer())
            .put(`/categories/${categoryCreated.id}`)
            .send(send_data)
            .expect(200);

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

