const devConfig = {
  DB: "mongodb://localhost:27017/devconnections",
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
};

export { devConfig };
