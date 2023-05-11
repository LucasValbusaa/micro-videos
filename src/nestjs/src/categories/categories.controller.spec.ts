import { CategoriesController } from "./categories.controller";
import { CreateCategoryDto } from "./dto/create-category.dto";
import {
  CreateCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
} from "@micro-videos/core/src/category/application";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { SearchDirection } from "@micro-videos/core/src/@shared/domain";

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
    const output = await controller.create(input);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(input);
    expect(expectedOutput).toStrictEqual(output);
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
    const output = await controller.update(id, input);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
    expect(expectedOutput).toStrictEqual(output);
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
    const output = await controller.findOne(id);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith({ id });
    expect(expectedOutput).toStrictEqual(output);
  });

  it("should list categories", async () => {
    const expectedOutput: ListCategoriesUseCase.Output = {
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
      execute: jest.fn().mockReturnValue(expectedOutput),
    };
    //@ts-expect-error
    controller["listUseCase"] = mockCreateUseCase;
    const searchParams = {
      page: 1,
      per_page: 2,
      sort: "name",
      sort_dir: "desc" as SearchDirection,
      filter: "test",
    };
    const output = await controller.search(searchParams);

    expect(mockCreateUseCase.execute).toHaveBeenCalledWith(searchParams);
    expect(expectedOutput).toStrictEqual(output);
  });
});

