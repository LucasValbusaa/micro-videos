import { Transform } from "class-transformer";

export type PaginationPresenterProps = {
  current_page: number;
  per_page: number;
  last_page: number;
  total: number;
};

export class PaginationPresenter {
  @Transform(({ value }) => parseInt(value))
  current_page: number;
  @Transform(({ value }) => parseInt(value))
  per_page: number;
  @Transform(({ value }) => parseInt(value))
  last_page: number;
  @Transform(({ value }) => parseInt(value))
  total: number;

  constructor(props: PaginationPresenterProps) {
    Object.assign(this, props);
  }
}

