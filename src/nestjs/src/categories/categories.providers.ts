import {
  CreateCategoryUseCase,
  UpdateCategoryUseCase,
  DeleteCategoryUseCase,
  GetCategoryUseCase,
  ListCategoriesUseCase,
} from "@micro-videos/core/src/category/application";
import {
  CategoryInMemoryRepository,
  CategoryModel,
  CategorySequelizeRepository,
} from "@micro-videos/core/src/category/infra";
import { CategoryRepository } from "@micro-videos/core/src/category/domain";
import { getModelToken } from "@nestjs/sequelize";

export namespace CATEGORY_PROVIDERS {
  export namespace REPOSITORIES {
    export const CATEGORY_IN_MEMORY_REPOSITORY = {
      provide: "CategoryInMemoryRepository",
      useClass: CategoryInMemoryRepository,
    };

    export const CATEGORY_SEQUELIZE_REPOSITORY = {
      provide: "CategorySequelizeRepository",
      useFactory: (categoryModel: typeof CategoryModel) => {
        return new CategorySequelizeRepository(categoryModel);
      },
      inject: [getModelToken(CategoryModel)],
    };

    export const CATEGORY_REPOSITORY = {
      provide: "CategoryRepository",
      useExisting: "CategorySequelizeRepository",
    };
  }

  export namespace USE_CASE {
    export const CREATE_CATEGORY_USE_CASE = {
      provide: CreateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new CreateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };

    export const UPDATE_CATEGORY_USE_CASE = {
      provide: UpdateCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new UpdateCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };

    export const DELETE_CATEGORY_USE_CASE = {
      provide: DeleteCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new DeleteCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };

    export const GET_CATEGORY_USE_CASE = {
      provide: GetCategoryUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new GetCategoryUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };

    export const LIST_CATEGORIES_USE_CASE = {
      provide: ListCategoriesUseCase.UseCase,
      useFactory: (categoryRepo: CategoryRepository.Repository) => {
        return new ListCategoriesUseCase.UseCase(categoryRepo);
      },
      inject: [REPOSITORIES.CATEGORY_REPOSITORY.provide],
    };
  }
}

