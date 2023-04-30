export enum SearchDirection {
  ASC = "asc",
  DESC = "desc",
}

export type SearchParamsProps<Filter = string> = {
  page?: number;
  per_page?: number;
  sort?: string;
  sort_dir?: SearchDirection;
  filter?: Filter;
};

export class SearchParams {
  private DEFAULT_PAGE_VALUE = 1;
  private DEFAULT_PER_PAGE_VALUE = 15;

  constructor(public readonly props: SearchParamsProps = {}) {
    this.validatePage(props.page);
    this.validatePerPage(props.per_page);
    this.validateSortDir(props.sort_dir);
    this.props.sort = this.stringOrNull(props.sort);
    this.props.filter = this.stringOrNull(props.filter);
  }

  private validatePage(value: number): void {
    let page = +value;

    if (this.isANumber(page) || (typeof value as any) === "boolean") {
      page = this.DEFAULT_PAGE_VALUE;
    }
    this.props.page = page;
  }

  private validatePerPage(value: number): void {
    let per_page = +value;

    if (this.isANumber(per_page) || (typeof value as any) === "boolean") {
      per_page = this.DEFAULT_PER_PAGE_VALUE;
    }
    this.props.per_page = per_page;
  }

  private isANumber(value: number): boolean {
    return (
      Number.isNaN(value) || value <= 0 || parseInt(value as any) !== value
    );
  }

  private validateSortDir(value: SearchDirection) {
    if (!this.props.sort) {
      this.props.sort_dir = null;
      return;
    }

    const dir = `${value}`.toLowerCase() as SearchDirection;
    this.props.sort_dir =
      dir !== SearchDirection.ASC && dir !== SearchDirection.DESC
        ? SearchDirection.ASC
        : dir;
  }

  private stringOrNull(value: string): string | null {
    return value === null || value === undefined || value === ""
      ? null
      : `${value}`;
  }
}
