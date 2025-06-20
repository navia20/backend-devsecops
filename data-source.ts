import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
dotenv.config();
import { User } from './src/users/user.entity';
import { Note } from './src/notes/note.entity';

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: process.env.database_url,
  entities: [User, Note],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});
