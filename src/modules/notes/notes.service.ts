import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Note } from "./entity/note.entity";
import { User } from "../users/entity/user.entity";
import { CreateNoteDto } from "./DTOs/create-note.dto";

@Injectable()
export class NotesService {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async createNote(createNoteDto: CreateNoteDto) {
    const { userId, texto } = createNoteDto;
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      return { success: false, error: "Usuario no encontrado." };
    }
    const note = this.noteRepository.create({ texto, user });
    await this.noteRepository.save(note);
    return { success: true, note };
  }

  async getNotes(userId: number) {
    if (!userId) return { success: false, error: "userId requerido" };
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
      order: { id: "DESC" },
    });
    return { success: true, notes };
  }

  async deleteNote(id: number) {
    if (!id) return { success: false, error: "id requerido" };
    await this.noteRepository.delete(id);
    return { success: true };
  }
}
