import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { User } from './users/user.entity';
import { Note } from './notes/note.entity';
import { AuthController } from './auth/auth.controller';
import { NotesController } from './notes/notes.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: process.env.database_url,
      autoLoadEntities: true,
      synchronize: false, // Usar migraciones para mayor seguridad
    }),
    TypeOrmModule.forFeature([User, Note]),
  ],
  controllers: [AppController, AuthController, NotesController],
  providers: [AppService],
})
export class AppModule {}
