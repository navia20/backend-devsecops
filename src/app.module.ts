import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule } from "@nestjs/config";
import { UsersModule } from "./modules/users/user.module";
import { NotesModule } from "./modules/notes/notes.module";
import { AuthModule } from "./modules/auth/auth.module";
import { AppController } from "./app.controller";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: "postgres",
      url: process.env.database_url,
      autoLoadEntities: true,
      synchronize: false, // Usar migraciones para mayor seguridad
    }),
    UsersModule,
    NotesModule,
    AuthModule,
  ],
  controllers: [AppController],
})
export class AppModule {}
