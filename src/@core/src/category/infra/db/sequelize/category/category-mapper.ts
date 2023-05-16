import {
  EntityValidationError,
  UniqueId,
  LoadEntityError,
} from "../../../../../@shared/domain";
import { Category } from "../../../../domain";
import { CategoryModel } from "./category-model";

export class CategoryModelMapper {
  static toEntity(model: CategoryModel) {
    const { id, ...otherData } = model.toJSON();
    const uniqueId = new UniqueId(id);
    try {
      return new Category(otherData, uniqueId);
    } catch (e) {
      if (e instanceof EntityValidationError) {
        throw new LoadEntityError(e.error);
      }
      throw e;
    }
  }
}
