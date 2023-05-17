import { Test } from "@nestjs/testing";
import { DatabaseModule } from "./database.module";
import { ConfigModule } from "../config/config.module";
import { getConnectionToken } from "@nestjs/sequelize";
import * as Joi from "joi";
import { CONFIG_DB_SCHEMA } from "../config/schemas";

describe("DatabaseModule Unit Tests", () => {
  describe("sqlite connection", () => {
    const connectionOptions = {
      DB_VENDOR: "sqlite",
      DB_HOST: ":memory:",
      DB_LOGGING: "false",
      DB_AUTO_LOAD_MODELS: true,
    };

    it("should be valid", () => {
      const schema = Joi.object({
        ...CONFIG_DB_SCHEMA,
      });
      const { error } = schema.validate(connectionOptions);
      expect(error).toBeUndefined();
    });

    it("should be a sqlite connection", async () => {
      const module = await Test.createTestingModule({
        imports: [
          DatabaseModule,
          ConfigModule.forRoot({
            isGlobal: true,
            ignoreEnvFile: true,
            ignoreEnvVars: true,
            validationSchema: null,
            load: [() => connectionOptions],
          }),
        ],
      }).compile();

      const app = module.createNestApplication();
      const connection = app.get(getConnectionToken());
      expect(connection).toBeDefined();
      expect(connection.options.dialect).toBe("sqlite");
      expect(connection.options.host).toBe(":memory:");
      expect(connection.options.logging).toBeFalsy();

      connection.close();
    });
  });

  //TODO:
  // describe("sqlite connection", () => {
  //   const connectionOptions = {
  //     DB_VENDOR: "mysql",
  //     DB_HOST: "localhost:",
  //     DB_DATABASE: "micro-videos",
  //     DB_USERNAME: "root",
  //     DB_PASSWORD: "root",
  //     DB_PORT: 3306,
  //     DB_LOGGING: "false",
  //     DB_AUTO_LOAD_MODELS: true,
  //   };

  //   it("should be valid", () => {
  //     const schema = Joi.object({
  //       ...CONFIG_DB_SCHEMA,
  //     });
  //     const { error } = schema.validate(connectionOptions);
  //     expect(error).toBeUndefined();
  //   });

  //   it("should be a sqlite connection", async () => {
  //     const module = await Test.createTestingModule({
  //       imports: [
  //         DatabaseModule,
  //         ConfigModule.forRoot({
  //           isGlobal: true,
  //           ignoreEnvFile: true,
  //           ignoreEnvVars: true,
  //           validationSchema: null,
  //           load: [() => connectionOptions],
  //         }),
  //       ],
  //     }).compile();

  //     const app = module.createNestApplication();
  //     const connection = app.get(getConnectionToken());
  //     expect(connection).toBeDefined();
  //     expect(connection.options.dialect).toBe("sqlite");
  //     expect(connection.options.host).toBe(":memory:");
  //     expect(connection.options.logging).toBeFalsy();

  //     connection.close();
  //   });
  // });
});

