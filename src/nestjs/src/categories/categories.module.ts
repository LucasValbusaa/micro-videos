import { Module } from "@nestjs/common";
import { CategoriesController } from "./categories.controller";
import { CATEGORY_PROVIDERS } from "./categories.providers";
import { SequelizeModule } from "@nestjs/sequelize";
import { CategoryModel } from "@micro-videos/core/src/category/infra";

@Module({
  imports: [SequelizeModule.forFeature([CategoryModel])],
  controllers: [CategoriesController],
  providers: [
    ...Object.values(CATEGORY_PROVIDERS.REPOSITORIES),
    ...Object.values(CATEGORY_PROVIDERS.USE_CASE),
  ],
})
export class CategoriesModule {}

