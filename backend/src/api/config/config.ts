import dotenv from 'dotenv';

dotenv.config({ path: './src/api/config/.env' });

export const env = {
  typeorm: {
    type: process.env.TYPEORM_TYPE as any,
    host: process.env.TYPEORM_HOST,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    port: Number.parseInt(process.env.TYPEORM_PORT),
    entities: process.env.TYPEORM_ENTITIES,
    entitiesDir: process.env.TYPEORM_ENTITIES_DIR
  },
  app: {
    port: Number.parseInt(process.env.PORT)
  }
};
