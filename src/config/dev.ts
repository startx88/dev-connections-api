const devConfig = {
  DB: `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@ds135974.mlab.com:35974/${process.env.DATABASE}`,
  PORT: process.env.PORT,
  SECRET_KEY: process.env.SECRET_KEY,
};

export { devConfig };
