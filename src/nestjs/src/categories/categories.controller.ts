import {
  Body,
  Controller,
  Inject,
  Post,
  Put,
  Param,
  Get,
  Delete,
  HttpCode,
  Query,
} from "@nestjs/common";
import {
  CreateCategoryUseCase,
  ListCategoriesUseCase,
  DeleteCategoryUseCase,
  UpdateCategoryUseCase,
  GetCategoryUseCase,
  CategoryOutput,
} from "@micro-videos/core/src/category/application";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { SearchCategoryDto } from "./dto/search-category.dto";
import {
  CategoryCollectionPresenter,
  CategoryPresenter,
} from "./presenter/category-presenter";
import { instanceToPlain } from "class-transformer";

@Controller("categories")
export class CategoriesController {
  @Inject(CreateCategoryUseCase.UseCase)
  private createUseCase: CreateCategoryUseCase.UseCase;

  @Inject(UpdateCategoryUseCase.UseCase)
  private updateUseCase: UpdateCategoryUseCase.UseCase;

  @Inject(DeleteCategoryUseCase.UseCase)
  private deleteUseCase: DeleteCategoryUseCase.UseCase;

  @Inject(GetCategoryUseCase.UseCase)
  private getUseCase: GetCategoryUseCase.UseCase;

  @Inject(ListCategoriesUseCase.UseCase)
  private listUseCase: ListCategoriesUseCase.UseCase;

  @Post()
  async create(@Body() createCategoryDto: CreateCategoryDto) {
    const output = await this.createUseCase.execute(createCategoryDto);
    return CategoriesController.categoryToResponse(output);
  }

  @Get()
  async search(@Query() searchCategoryDto: SearchCategoryDto) {
    const output = await this.listUseCase.execute(searchCategoryDto);
    return new CategoryCollectionPresenter(output);
  }

  @Get(":id")
  async findOne(@Param("id") id: string) {
    const output = await this.getUseCase.execute({ id });
    return CategoriesController.categoryToResponse(output);
  }

  @Put(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    const output = await this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });

    return CategoriesController.categoryToResponse(output);
  }

  @HttpCode(204)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.deleteUseCase.execute({ id });
  }

  static categoryToResponse(output: CategoryOutput) {
    return instanceToPlain(new CategoryPresenter(output));
  }
}
