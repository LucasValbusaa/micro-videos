import { Entity } from "../../entity/";
import { NotFoundError } from "../../errors";
import { UniqueId } from "../../value-object";
import { InMemoryRepository } from "../in-memory-repository";

type StubEntityProps = {
  name: string;
  price: number;
};

class StubEntity extends Entity<StubEntityProps> {}

class StubInMemoryRepository extends InMemoryRepository<StubEntity> {}

function createStubEntity(): StubEntity {
  return new StubEntity({ name: "some name", price: 5 });
}

describe("InMemoryRepository Unit Test", () => {
  let repository: StubInMemoryRepository;
  let entity: StubEntity;
  beforeEach(() => {
    repository = new StubInMemoryRepository();
    entity = new StubEntity({ name: "some name", price: 5 });
  });

  it("should inserts a new Entity", async () => {
    const entity = createStubEntity();
    await repository.insert(entity);
    expect(entity.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error when entity not found", async () => {
    await expect(repository.findById("fake_id")).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );

    await expect(
      repository.findById("5982cad0-20d3-4b66-b648-c82c799ea2f6")
    ).rejects.toThrow(
      new NotFoundError(
        "Entity not found using ID 5982cad0-20d3-4b66-b648-c82c799ea2f6"
      )
    );
  });

  it("should find entity by id", async () => {
    const entity = createStubEntity();
    await repository.insert(entity);

    let entityFound = await repository.findById(entity.id);
    expect(entity.toJSON()).toStrictEqual(entityFound.toJSON());
  });

  it("should return all entities", async () => {
    const entities = [createStubEntity(), createStubEntity()];
    for (const entity of entities) {
      await repository.insert(entity);
    }

    const foundAllEntities = await repository.findAll();

    expect(foundAllEntities).toStrictEqual(entities);
  });

  it("should throws error on update when entity not found", async () => {
    await expect(repository.update(entity)).rejects.toThrow(
      new NotFoundError(`Entity not found using ID ${entity.id}`)
    );
  });

  it("should update an entity", async () => {
    await repository.insert(entity);

    const entityUpdate = new StubEntity(
      { name: "updated name", price: 1 },
      new UniqueId(entity.id.toString())
    );

    await repository.update(entityUpdate);
    expect(entityUpdate.toJSON()).toStrictEqual(repository.items[0].toJSON());
  });

  it("should throws error on delete when entity not found", async () => {
    await expect(repository.delete("fake_id")).rejects.toThrow(
      new NotFoundError("Entity not found using ID fake_id")
    );

    await expect(
      repository.delete("5982cad0-20d3-4b66-b648-c82c799ea2f6")
    ).rejects.toThrow(
      new NotFoundError(
        "Entity not found using ID 5982cad0-20d3-4b66-b648-c82c799ea2f6"
      )
    );
  });

  it("should delete an entity", async () => {
    await repository.insert(entity);
    await repository.delete(entity.id);

    expect(repository.items).toHaveLength(0);
  });
});
