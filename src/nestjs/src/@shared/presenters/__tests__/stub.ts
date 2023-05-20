export function makeInputMetaPresenter() {
  return {
    current_page: 1,
    per_page: 2,
    last_page: 3,
    total: 4,
  };
}

export function makeInputMetaPresenterAsString() {
  return {
    current_page: "1" as any,
    per_page: "2" as any,
    last_page: "3" as any,
    total: "4" as any,
  };
}

export function makeInputDataPresenter(created_at?: Date) {
  return {
    id: "5982cad0-20d3-4b66-b648-c82c799ea2f6",
    name: "Movie",
    description: "some description",
    is_active: true,
    created_at: created_at ?? new Date(),
  };
}

