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
} from "@micro-videos/core/src/category/application";
import { CreateCategoryDto } from "./dto/create-category.dto";
import { UpdateCategoryDto } from "./dto/update-category.dto";
import { SearchCategoryDto } from "./dto/search-category.dto";

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
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.createUseCase.execute(createCategoryDto);
  }

  @Get()
  search(@Query() searchCategoryDto: SearchCategoryDto) {
    return this.listUseCase.execute(searchCategoryDto);
  }

  @Get(":id")
  findOne(@Param("id") id: string) {
    return this.getUseCase.execute({ id });
  }

  @Put(":id")
  update(
    @Param("id") id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.updateUseCase.execute({
      id,
      ...updateCategoryDto,
    });
  }

  @HttpCode(204)
  @Delete(":id")
  delete(@Param("id") id: string) {
    return this.deleteUseCase.execute({ id });
  }
}

