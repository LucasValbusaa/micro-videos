import { Sequelize, SequelizeOptions } from "sequelize-typescript";
import { Config, configTesting } from "../../config";

const {
  db: { host, logging, vendor },
} = configTesting;

const defaultOptions: SequelizeOptions = {
  dialect: vendor,
  host,
  logging,
};

export function setupSequelize(options: SequelizeOptions = {}) {
  let _sequelize: Sequelize;

  beforeAll(
    () =>
      (_sequelize = new Sequelize({
        ...defaultOptions,
        ...options,
      }))
  );

  beforeEach(async () => {
    await _sequelize.sync({ force: true });
  });

  afterAll(async () => {
    await _sequelize.close();
  });

  return {
    get sequelize() {
      return _sequelize;
    },
  };
}
