import { NotFoundError, UniqueId } from "../../../../@shared/domain";
import { Category } from "../../../domain";
import CategoryRepository from "../../../domain/repository/category.repository";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[];

  constructor(private categoryModel: typeof CategoryModel) {}

  search(
    props: CategoryRepository.SearchParams
  ): Promise<CategoryRepository.SearchResult> {
    throw new Error("Method not implemented.");
  }
  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }
  async findById(id: string | UniqueId): Promise<Category> {
    const model = await this._get(id.toString());
    return CategoryModelMapper.toEntity(model);
  }

  findAll(): Promise<Category[]> {
    throw new Error("Method not implemented.");
  }
  update(entity: Category): Promise<void> {
    throw new Error("Method not implemented.");
  }
  delete(id: string | UniqueId): Promise<void> {
    throw new Error("Method not implemented.");
  }

  private async _get(id: string) {
    return await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity not found using ID ${id}`),
    });
  }
}
