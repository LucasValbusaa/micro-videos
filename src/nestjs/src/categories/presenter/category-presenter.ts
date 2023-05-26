import {
  CategoryOutput,
  ListCategoriesUseCase,
} from "@micro-videos/core/src/category/application";
import { CollectionPresenter } from "../../@shared/presenters/collection.presenter";
import { Transform } from "class-transformer";

export class CategoryPresenter {
  id: string;
  name: string;
  description: string | null;
  is_active: boolean;
  @Transform(({ value }: { value: Date }) => {
    return value.toISOString().slice(0, 19) + ".000Z";
  })
  created_at: Date;

  constructor(output: CategoryOutput) {
    Object.assign(this, output);
  }

  toJson() {
    return {
      id: this.id,
      name: this.name,
      description: this.description,
      is_active: this.is_active,
      created_at: this.created_at,
    };
  }
}

export class CategoryCollectionPresenter extends CollectionPresenter {
  data: CategoryPresenter[];

  constructor(output: ListCategoriesUseCase.Output) {
    const { items, ...paginationProps } = output;
    super(paginationProps);
    this.data = items.map((item) => new CategoryPresenter(item));
  }
}
