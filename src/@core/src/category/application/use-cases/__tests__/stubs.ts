import { CategoryModel } from "category/infra";
import { Category } from "../../../domain/entities/category";

type UpdateCategoryParamsProps = {
  input: {
    id: string;
    name: string;
    description?: string | null;
    is_active?: boolean | null;
  };
  expected: {
    id: string;
    name: string;
    description: string | null;
    is_active: boolean | null;
    created_at: Date;
  };
};

export function updateCategoryParams(
  id: string,
  category: Category | CategoryModel
): UpdateCategoryParamsProps[] {
  return [
    {
      input: {
        id,
        name: "Movie Update",
      },
      expected: {
        id: category.id.toString(),
        name: "Movie Update",
        description: null,
        is_active: true,
        created_at: category.created_at,
      },
    },
    {
      input: {
        id,
        name: "Movie Update",
        description: "some description",
      },
      expected: {
        id: category.id.toString(),
        name: "Movie Update",
        description: "some description",
        is_active: true,
        created_at: category.created_at,
      },
    },
    {
      input: {
        id,
        name: "Movie Update",
      },
      expected: {
        id: category.id.toString(),
        name: "Movie Update",
        description: null,
        is_active: true,
        created_at: category.created_at,
      },
    },
    {
      input: {
        id,
        name: "Movie Update",
        is_active: false,
      },
      expected: {
        id: category.id.toString(),
        name: "Movie Update",
        description: null,
        is_active: false,
        created_at: category.created_at,
      },
    },
    {
      input: {
        id,
        name: "Movie Update",
      },
      expected: {
        id: category.id.toString(),
        name: "Movie Update",
        description: null,
        is_active: false,
        created_at: category.created_at,
      },
    },
    {
      input: {
        id,
        name: "Movie Update",
        is_active: true,
      },
      expected: {
        id: category.id.toString(),
        name: "Movie Update",
        description: null,
        is_active: true,
        created_at: category.created_at,
      },
    },
  ];
}
