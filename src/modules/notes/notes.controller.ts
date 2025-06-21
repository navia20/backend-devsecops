import { Controller, Post, Body, Get, Query, Delete } from "@nestjs/common";
import { NotesService } from "./notes.service";
import { CreateNoteDto } from "./DTOs/create-note.dto";

@Controller("notes")
export class NotesController {
  constructor(private readonly notesService: NotesService) {}

  @Post()
  async createNote(@Body() createNoteDto: CreateNoteDto) {
    return this.notesService.createNote(createNoteDto);
  }

  @Get()
  async getNotes(@Query("userId") userId: number) {
    return this.notesService.getNotes(userId);
  }

  @Delete()
  async deleteNote(@Query("id") id: number) {
    return this.notesService.deleteNote(id);
  }
}
