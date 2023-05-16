import { CategoryModel, CategorySequelizeRepository } from "../../../../infra";
import { CreateCategoryUseCase } from "../../create-category.use-case";
import { setupSequelize } from "../../../../../@shared/infra";

describe("CreateCategoryUseCase Integration Test", () => {
  let useCase: CreateCategoryUseCase.UseCase;
  let repository: CategorySequelizeRepository;

  setupSequelize({ models: [CategoryModel] });

  beforeEach(() => {
    repository = new CategorySequelizeRepository(CategoryModel);
    useCase = new CreateCategoryUseCase.UseCase(repository);
  });

  describe("should create a category", () => {
    const arrange = [
      {
        inputProps: { name: "Movie" },
        outputProps: {
          name: "Movie",
          description: null,
          is_active: true,
        },
      },
      {
        inputProps: { name: "Movie", description: "some description" },
        outputProps: {
          name: "Movie",
          description: "some description",
          is_active: true,
        },
      },

      {
        inputProps: {
          name: "Movie",
          description: "some description",
          is_active: true,
        },
        outputProps: {
          name: "Movie",
          description: "some description",
          is_active: true,
        },
      },
      {
        inputProps: {
          name: "Movie",
          description: "some description",
          is_active: false,
        },
        outputProps: {
          name: "Movie",
          description: "some description",
          is_active: false,
        },
      },
    ];

    test.each(arrange)(
      "input: $inputProps /// output: $outputProps",
      async ({ inputProps, outputProps }) => {
        let output = await useCase.execute(inputProps);
        let entity = await repository.findById(output.id);
        const formatOutput = {
          id: entity.id.toString(),
          created_at: entity.created_at,
          ...outputProps,
        };

        expect(output).toStrictEqual(formatOutput);
      }
    );
  });
});
