import { Entity } from "../entity";
import { NotFoundError } from "../errors";
import { UniqueId, ValueObject } from "../value-object";
import { RepositoryInterface } from "./repository-contracts";

export abstract class InMemoryRepository<
  E extends Entity,
  EntityId extends ValueObject
> implements RepositoryInterface<E, EntityId>
{
  items: E[] = [];

  async insert(entity: E): Promise<void> {
    this.items.push(entity);
  }
  async bulkInsert(entities: E[]): Promise<void> {
    this.items.push(...entities);
  }

  async findById(id: string | EntityId): Promise<E> {
    const _id = `${id}`;
    return this._get(_id);
  }
  async findAll(): Promise<E[]> {
    return this.items;
  }
  async update(entity: E): Promise<void> {
    await this._get(entity.id.value);
    const indexFound = this.items.findIndex(
      (item) => item.id.toString() === entity.id.toString()
    );
    this.items[indexFound] = entity;
  }
  async delete(id: string | EntityId): Promise<void> {
    const _id = `${id}`;
    await this._get(_id);
    const indexFound = this.items.findIndex(
      (item) => item.id.toString() === _id
    );
    this.items.splice(indexFound, 1);
  }

  protected async _get(id: string | EntityId): Promise<E> {
    const entity = this.items.find(
      (item) => item.id.toString() === id.toString()
    );
    if (!entity) {
      throw new NotFoundError(`Entity not found using ID ${id}`);
    }
    return entity;
  }
}
