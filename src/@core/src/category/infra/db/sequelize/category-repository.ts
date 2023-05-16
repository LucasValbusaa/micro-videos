import {
  NotFoundError,
  SearchDirection,
  UniqueId,
} from "../../../../@shared/domain";
import { Category } from "../../../domain";
import CategoryRepository from "../../../domain/repository/category.repository";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import { Op } from "sequelize";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[];

  constructor(private categoryModel: typeof CategoryModel) {}

  async search({
    props,
  }: CategoryRepository.SearchParams): Promise<CategoryRepository.SearchResult> {
    const offset = (props.page - 1) * props.per_page;
    const limit = props.per_page;

    const { rows, count } = await this.categoryModel.findAndCountAll({
      ...(props.filter && {
        where: { name: { [Op.like]: `%${props.filter}%` } },
      }),
      ...(props.sort && this.sortableFields.includes(props.sort)
        ? { order: [[props.sort, props.sort_dir]] }
        : { order: [["created_at", "DESC"]] }),
      offset,
      limit,
    });

    return new CategoryRepository.SearchResult({
      items: rows.map((m) => CategoryModelMapper.toEntity(m)),
      current_page: props.page,
      per_page: props.per_page,
      total: count,
      sort: props.sort,
      sort_dir: props.sort_dir,
      filter: props.filter,
    });
  }
  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }
  async findById(id: string | UniqueId): Promise<Category> {
    const model = await this._get(id.toString());
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const model = await this.categoryModel.findAll();
    return model.map((m) => CategoryModelMapper.toEntity(m));
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
