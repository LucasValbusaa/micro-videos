import { INestApplication } from "@nestjs/common";
import { Test, TestingModule } from "@nestjs/testing";
import { AppModule } from "../../app.module";
import { applyGlobalConfig } from "../../global-configs";
import { getConnectionToken } from "@nestjs/sequelize";
import { ConfigService } from "@nestjs/config";
import { migrator } from "@micro-videos/core/src/@shared/infra";

export function startApp({
  beforeInit,
}: { beforeInit?: (app: INestApplication) => void } = {}) {
  let _app: INestApplication;
  let canRunMigrations: boolean;

  beforeEach(async () => {
    const moduleBuilder: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    canRunMigrations = !moduleBuilder
      .get(ConfigService)
      .get("DB_AUTO_LOAD_MODELS");

    const sequelize = moduleBuilder.get(getConnectionToken());

    try {
      if (canRunMigrations) {
        const umzug = migrator(sequelize, { logger: undefined });
        await sequelize.drop();
        //await umzug.down({ to: 0 as any });
        await umzug.up();
      } else {
        await sequelize.sync({ force: true });
      }
    } catch (error) {
      console.error(error);
      throw error;
    }

    _app = moduleBuilder.createNestApplication();
    applyGlobalConfig(_app);
    beforeInit && beforeInit(_app);
    await _app.init();
  });

  afterEach(async () => {
    if (_app) {
      await _app.close();
    }
  });

  return {
    get app() {
      return _app;
    },
  };
}

