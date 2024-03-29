import { NestFactory } from "@nestjs/core";
import { getConnectionToken } from "@nestjs/sequelize";
import { MigrationModule } from "./database/migration/migration.module";
import { migrator } from "@micro-videos/core/src/@shared/infra";

async function bootstrap() {
  // Standalone application
  const app = await NestFactory.createApplicationContext(MigrationModule, {
    logger: ["error"],
  });
  const sequelize = app.get(getConnectionToken());
  migrator(sequelize).runAsCLI();
}
bootstrap();

