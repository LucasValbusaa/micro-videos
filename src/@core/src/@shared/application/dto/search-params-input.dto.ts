import { SortDirection } from "../../domain/repositories/pagination/search-params";

export type SearchParamsInputDTO<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string | null;
  sort_dir?: SortDirection | null;
  filter?: Filter | null;
};
