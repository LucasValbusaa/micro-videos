import { SearchDirection } from "#shared/domain/repositories/pagination";

export type SearchParamsInputDTO<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SearchDirection | null;
  filter?: Filter | null;
};
