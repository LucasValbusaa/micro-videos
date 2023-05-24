import { config as readEnv } from "dotenv";
import { join } from "path";

export type Config = {
  db: {
    vendor: any;
    host: string;
    logging: boolean;
  };
};

function makeConfig(envFile: string): Config {
  const { parsed } = readEnv({ path: envFile });
  return {
    db: {
      vendor: parsed.DB_SQLITE_DIALECT as any,
      host: parsed.DB_SQLITE_HOST,
      logging: parsed.DB_SQLITE_LOGGING === "true",
    },
  };
}

const envTestingFile = join(__dirname, "../../../../.env.test");
export const configTesting = makeConfig(envTestingFile);
