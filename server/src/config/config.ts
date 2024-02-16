const config = {
  redisHost: process.env.REDIS_HOST,
  redisPort: process.env.REDIS_PORT,
  pgUser: process.env.PGUSER,
  pgHost: process.env.PGHOST,
  pgDatabase: process.env.PGDATABASE,
  pgPassword: process.env.PGPASSWORD,
  pgPort: process.env.PGPORT,
  workerServerHost: process.env.WORKER_SERVER_HOST,
  workerServerPort: process.env.WORKER_SERVER_PORT,
};

export default config;
