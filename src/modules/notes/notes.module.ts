import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Note } from "./entity/note.entity";
import { NotesService } from "./notes.service";
import { NotesController } from "./notes.controller";
import { User } from "../users/entity/user.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Note, User])],
  providers: [NotesService],
  controllers: [NotesController],
  exports: [NotesService],
})
export class NotesModule {}
