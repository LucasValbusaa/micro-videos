import { Entity } from "../entity/entity";
import { UniqueId } from "../value-object/unique-id";

export interface RepositoryInterface<E extends Entity> {
  insert(entity: E): Promise<void>;
  findById(id: string | UniqueId): Promise<E>;
  findAll(): Promise<E[]>;
  update(entity: E): Promise<void>;
  delete(id: string | UniqueId): Promise<void>;
}
