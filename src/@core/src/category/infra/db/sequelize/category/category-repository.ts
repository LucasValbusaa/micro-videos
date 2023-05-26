import {
  NotFoundError,
  SortDirection,
  UniqueId,
} from "../../../../../@shared/domain";
import { Category } from "../../../../domain";
import CategoryRepository from "../../../../domain/repository/category.repository";
import { CategoryModel } from "./category-model";
import { CategoryModelMapper } from "./category-mapper";
import { Op, literal } from "sequelize";

export class CategorySequelizeRepository
  implements CategoryRepository.Repository
{
  sortableFields: string[] = ["name", "created_at"];
  orderBy = {
    mysql: {
      name: (sort_dir: SortDirection) => literal(`binary name ${sort_dir}`),
    },
  };

  constructor(private categoryModel: typeof CategoryModel) {}

  async insert(entity: Category): Promise<void> {
    await this.categoryModel.create(entity.toJSON());
  }

  async bulkInsert(entities: Category[]): Promise<void> {
    await this.categoryModel.bulkCreate(entities.map((e) => e.toJSON()));
  }

  async findById(id: string | UniqueId): Promise<Category> {
    const model = await this._get(id.toString());
    return CategoryModelMapper.toEntity(model);
  }

  async findAll(): Promise<Category[]> {
    const model = await this.categoryModel.findAll();
    return model.map((m) => CategoryModelMapper.toEntity(m));
  }
  async update(entity: Category): Promise<void> {
    const id = entity.id.toString();
    await this._get(id);
    await this.categoryModel.update(entity.toJSON(), {
      where: { id },
    });
  }
  async delete(id: string | UniqueId): Promise<void> {
    const _id = id.toString();
    await this._get(_id);
    await this.categoryModel.destroy({ where: { id: _id } });
  }

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
        ? { order: this.formatSort(props.sort, props.sort_dir) }
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

  private formatSort(sort: string, sort_dir: SortDirection) {
    const dialect = this.categoryModel.sequelize.getDialect();
    if (this.orderBy[dialect] && this.orderBy[dialect][sort]) {
      return this.orderBy[dialect][sort](sort_dir);
    }
    return [[sort, sort_dir]];
  }

  private async _get(id: string) {
    return await this.categoryModel.findByPk(id, {
      rejectOnEmpty: new NotFoundError(`Entity not found using ID ${id}`),
    });
  }
}
