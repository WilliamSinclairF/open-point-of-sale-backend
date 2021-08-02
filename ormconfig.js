const SOURCE_PATH = process.env.NODE_ENV === 'production' ? 'dist' : 'src';

console.log(SOURCE_PATH);

module.exports = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'test',
  password: 'test',
  database: 'test',
  synchronize: true,
  logging: true,
  entities: [`${SOURCE_PATH}/entity/**{.ts,.js}`],
  migrations: ['src/migration/**/*.ts'],
  subscribers: ['src/subscriber/**/*.ts'],
  cli: {
    entitiesDir: 'src/entity',
    migrationsDir: 'src/migration',
    subscribersDir: 'src/subscriber',
  },
};
