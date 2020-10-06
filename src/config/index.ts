import merge from "lodash/merge";
import { devConfig } from "./dev";
import { prodConfig } from "./prod";

process.env.NODE_ENV = process.env.NODE_ENV || "development";
const env = process.env.NODE_ENV;

interface IConfig {
  DB: string;
  PORT: number | string;
  SECRET_KEY: string;
  EMAIL_API_KEY: string;
}

// global configuration
const globalConfig = {
  EMAIL_API_KEY: process.env.EMAIL_API_KEY,
};

// configuration
let config = {};

switch (env) {
  case "production":
  case "prod":
    config = prodConfig;
  default:
    config = devConfig;
}

// export
const defautlConfig = merge(globalConfig, config) as IConfig;
export { defautlConfig };