import merge from "lodash/merge";
import { devConfig } from "./dev";
import { prodConfig } from "./prod";

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const type = process.env.NODE_ENV;

interface IConfig {
  DB: string;
  PORT: number | string;
  SECRET_KEY: string;
  EMAIL_API_KEY: string;
  GITHUB_CLIENT_ID: string;
  GITHUB_SECRET_ID: string;
}

// global configuration
const globalConfig = {
  EMAIL_API_KEY: process.env.EMAIL_API_KEY,
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_SECRET_ID: process.env.GITHUB_SECRET_ID,
};

// configuration
let config = {};

switch (type) {
  case 'production':
    config = prodConfig;
  case 'development':
    config = devConfig;
  default:
    config = devConfig;
}

// export


const defautlConfig = merge(globalConfig, config) as IConfig;
export { defautlConfig };
