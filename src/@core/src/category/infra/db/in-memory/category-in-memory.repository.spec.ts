import { Category } from "../../../domain/entities/category";
import { CategoryInMemoryRepository } from "./category-in-memory.repository";

describe("CategoryInMemoryRepository Unit Test", () => {
  let repository: CategoryInMemoryRepository;
  beforeEach(() => (repository = new CategoryInMemoryRepository()));

  it("should no filter items when filter object is null", async () => {
    const items = [new Category({ name: "test" })];
    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = await repository["applyFilter"](items, null);

    expect(spyFilterMethod).not.toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual(itemsFiltered);
  });

  it("should filter item using filter parameter", async () => {
    const items = [
      new Category({ name: "test" }),
      new Category({ name: "TEST" }),
      new Category({ name: "fake" }),
    ];

    const spyFilterMethod = jest.spyOn(items, "filter");
    const itemsFiltered = await repository["applyFilter"](items, "test");

    expect(spyFilterMethod).toHaveBeenCalled();
    expect(itemsFiltered).toStrictEqual([items[0], items[1]]);
  });

  it("should sort by created_at when sort param is null", async () => {
    const createdAtInstance = new Date();
    const items = [
      new Category({ name: "test", created_at: createdAtInstance }),
      new Category({
        name: "TEST",
        created_at: new Date(createdAtInstance.getTime() + 100),
      }),
      new Category({
        name: "fake",
        created_at: new Date(createdAtInstance.getTime() + 200),
      }),
    ];

    const itemsSorted = await repository["applySort"](items, null, null);
    expect(itemsSorted).toStrictEqual([items[2], items[1], items[0]]);
  });

  it("should sort by name", async () => {
    const items = [
      new Category({ name: "c" }),
      new Category({ name: "b" }),
      new Category({ name: "a" }),
    ];

    let itemsSorted = await repository["applySort"](items, "name", "asc");
    expect(itemsSorted).toStrictEqual([...items].reverse());

    itemsSorted = await repository["applySort"](items, "name", "desc");
    expect(itemsSorted).toStrictEqual(items);
  });
});
