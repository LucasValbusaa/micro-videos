import { CategoriesController } from "../../categories.controller";
import { CreateCategoryDto } from "../../dto/create-category.dto";
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
} from "@micro-videos/core/src/category/application";
import { UpdateCategoryDto } from "../../dto/update-category.dto";
import { SortDirection } from "@micro-videos/core/src/@shared/domain";
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from "../../presenter/category-presenter";
import { instanceToPlain } from "class-transformer";

describe("CategoriesController Unit Tests", () => {
  let controller: CategoriesController;

  beforeEach(async () => {
    controller = new CategoriesController();
  });

  it("should create a category", async () => {
    const expectedOutput: CreateCategoryUseCase.Output = {
      id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
      name: "Movie",
      description: "Some Description",
      is_active: true,
      created_at: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller["createUseCase"] = mockCreateUseCase;
    const input: CreateCategoryDto = {
      name: "Movie",
      description: "Some Description",
      is_active: true,
    };
    const presenter = await controller.create(input);
    const expectedPresenter = instanceToPlain(
      new CategoryPresenter(expectedOutput),
    );

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    //expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(expectedPresenter);
  });

  it("should update a category", async () => {
    const id = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
    const expectedOutput: CreateCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "Some Description",
      is_active: true,
      created_at: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller["updateUseCase"] = mockCreateUseCase;
    const input: UpdateCategoryDto = {
      name: "Movie",
      description: "Some Description",
      is_active: true,
    };
    const presenter = await controller.update(id, input);
    const expectedPresenter = instanceToPlain(
      new CategoryPresenter(expectedOutput),
    );

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
    //expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(expectedPresenter);
  });

  it("should delete a category", async () => {
    const expectedOutput = undefined;
    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(expectedOutput)),
    };

    //@ts-expect-error
    controller["deleteUseCase"] = mockCreateUseCase;
    const id = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
    expect(controller.delete(id)).toBeInstanceOf(Promise);

    const output = await controller.delete(id);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it("should gets a category", async () => {
    const id = "5982cad0-20d3-4b66-b648-c82c799ea2f6";
    const expectedOutput: GetCategoryUseCase.Output = {
      id,
      name: "Movie",
      description: "Some Description",
      is_active: true,
      created_at: new Date(),
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller["getUseCase"] = mockCreateUseCase;
    const presenter = await controller.findOne(id);
    const expectedPresenter = instanceToPlain(
      new CategoryPresenter(expectedOutput),
    );

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({ id });
    //expect(presenter).toBeInstanceOf(CategoryPresenter);
    expect(presenter).toStrictEqual(expectedPresenter);
  });

  it("should list categories", async () => {
    const output: ListCategoriesUseCase.Output = {
      items: [
        {
          id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
          name: "Movie",
          description: "Some Description",
          is_active: true,
          created_at: new Date(),
        },
      ],
      current_page: 1,
      last_page: 1,
      per_page: 1,
      total: 1,
    };

    const mockCreateUseCase = {
      execute: jest.fn().mockReturnValue(output),
    };
    //@ts-expect-error
    controller["listUseCase"] = mockCreateUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc" as SortDirection,
      filter: "test",
    };
    const presenter = await controller.search(searchParams);
    //expect(presenter).toBeInstanceOf(CategoryCollectionPresenter);
    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(presenter).toEqual(new CategoryCollectionPresenter(output));
  });
});
