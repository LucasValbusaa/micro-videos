import { CategoryModel } from "@micro-videos/core/src/category/infra";
import { Module } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { CONFIG_SCHEMA_TYPE } from "../config/schemas";

const models = [CategoryModel];

@Module({
  imports: [
    SequelizeModule.forRootAsync({
      useFactory: async (config: ConfigService<CONFIG_SCHEMA_TYPE>) => {
        const logging: any =
          config.get("DB_LOGGING") === "false"
            ? false
            : config.get("DB_LOGGING") === "true"
            ? true
            : console.log;

        if (config.get("DB_VENDOR") === "sqlite") {
          return {
            dialect: "sqlite",
            host: config.get("DB_HOST"),
            models,
            autoLoadModels: config.get("DB_AUTO_LOAD_MODELS"),
            logging,
          };
        }

        if (config.get("DB_VENDOR") === "mysql") {
          return {
            dialect: "mysql",
            host: config.get("DB_HOST"),
            database: config.get("DB_DATABASE"),
            username: config.get("DB_USERNAME"),
            password: config.get("DB_PASSWORD"),
            port: config.get("DB_PORT"),
            models,
            autoLoadModels: config.get("DB_AUTO_LOAD_MODELS"),
            logging,
          };
        }

        throw new Error("Unsupported database config");
      },
      inject: [ConfigService],
    }),
  ],
})
export class DatabaseModule {}

