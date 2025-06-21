import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "../users/entity/user.entity";
import { LoginDto } from "./DTOs/login.dto";

export interface LoginResult {
  success: boolean;
  user?: { id: number; username: string };
  error?: string;
}

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  async login(loginDto: LoginDto): Promise<LoginResult> {
    try {
      const { username, password } = loginDto;
      const user = await this.userRepository.findOneBy({
        username: username.trim(),
      });

      if (!user) {
        return { success: false, error: "Usuario o contraseña incorrectos." };
      }

      if (user.password.trim() !== password.trim()) {
        return { success: false, error: "Contraseña incorrecta." };
      }

      return {
        success: true,
        user: { id: user.id, username: user.username },
      };
    } catch (error) {
      return { success: false, error: "Error interno del servidor." };
    }
  }
}
