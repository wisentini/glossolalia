import { createConnection } from 'typeorm';
import { env } from '../config/config';

createConnection({
  type: env.typeorm.type,
  host: env.typeorm.host,
  username: env.typeorm.username,
  password: env.typeorm.password,
  database: env.typeorm.database,
  port: env.typeorm.port,
  entities: [env.typeorm.entities],
  cli: {
    entitiesDir: env.typeorm.entitiesDir
  }
});
