import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
dotenv.config();
import { User } from "./src/modules/users/entity/user.entity";
import { Note } from "src/modules/notes/entity/note.entity";

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.database_url,
  entities: [User, Note],
  migrations: ["src/migrations/*.ts"],
  synchronize: false,
});
