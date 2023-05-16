import { Model } from "sequelize-typescript";

interface IModelSequelize<ModelClass extends Model, ModelProps = any> {
  create(data: ModelProps): Promise<ModelClass>;
  build(data: ModelProps): ModelClass;
  bulkCreate(data: any[]): Promise<ModelClass[]>;
  bulkBuild(data: any[]): ModelClass[];
}

export class SequelizeModelFactory<ModelClass extends Model, ModelProps = any> {
  private _count = 1;

  constructor(
    private model: IModelSequelize<ModelClass, ModelProps>,
    private defaultFactoryProps: () => ModelProps
  ) {}

  async create(data?: ModelProps): Promise<ModelClass> {
    return this.model.create(data ?? this.defaultFactoryProps());
  }

  make(data?: ModelProps) {
    return this.model.build(data ? data : this.defaultFactoryProps());
  }

  async bulkCreate(factoryProps?: (index: number) => ModelProps) {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return this.model.bulkCreate(data);
  }

  bulkMake(factoryProps?: (index: number) => ModelProps) {
    const data = new Array(this._count)
      .fill(factoryProps ? factoryProps : this.defaultFactoryProps)
      .map((factory, index) => factory(index));

    return this.model.bulkBuild(data);
  }

  count(count: number) {
    this._count = count;
    return this;
  }
}
