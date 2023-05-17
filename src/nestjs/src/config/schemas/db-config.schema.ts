import * as Joi from "joi";

export type DB_SCHEMA_TYPE = {
  DB_VENDOR: "mysql" | "sqlite";
  DB_HOST: string;
  DB_DATABASE: string;
  DB_USERNAME: string;
  DB_PASSWORD: string;
  DB_PORT: number;
  DB_LOGGING: string;
  DB_AUTO_LOAD_MODELS: boolean;
};

export const CONFIG_DB_SCHEMA: Joi.StrictSchemaMap<DB_SCHEMA_TYPE> = {
  DB_VENDOR: Joi.string().required().valid("mysql", "sqlite"),
  DB_HOST: Joi.string().required(),
  DB_DATABASE: Joi.string().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_USERNAME: Joi.string().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_PASSWORD: Joi.string().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_PORT: Joi.number().when("DB_VENDOR", {
    is: "mysql",
    then: Joi.required(),
  }),
  DB_LOGGING: Joi.string().required().valid("false", "true", "console.log"),
  DB_AUTO_LOAD_MODELS: Joi.boolean().required(),
};

