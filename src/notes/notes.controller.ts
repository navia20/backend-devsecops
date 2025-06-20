import { Controller, Post, Body, Get, Query, Delete } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Note } from './note.entity';
import { User } from '../users/user.entity';

@Controller('notes')
export class NotesController {
  constructor(
    @InjectRepository(Note)
    private readonly noteRepository: Repository<Note>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post()
  async createNote(@Body() body: { texto: string; userId: number }) {
    const user = await this.userRepository.findOneBy({ id: body.userId });
    if (!user) {
      return { success: false, error: 'Usuario no encontrado.' };
    }
    const note = this.noteRepository.create({ texto: body.texto, user });
    await this.noteRepository.save(note);
    return { success: true, note };
  }

  @Get()
  async getNotes(@Query('userId') userId: number) {
    if (!userId) return { success: false, error: 'userId requerido' };
    const notes = await this.noteRepository.find({
      where: { user: { id: userId } },
      order: { id: 'DESC' },
    });
    return { success: true, notes };
  }

  @Delete()
  async deleteNote(@Query('id') id: number) {
    if (!id) return { success: false, error: 'id requerido' };
    await this.noteRepository.delete(id);
    return { success: true };
  }
}
