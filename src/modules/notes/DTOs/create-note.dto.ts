import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNoteDto {
  @IsNotEmpty()
  @IsString()
  texto: string;

  @IsNotEmpty()
  @IsNumber()
  userId: number;
}
