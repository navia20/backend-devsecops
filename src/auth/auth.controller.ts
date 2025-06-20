import { Controller, Post, Body } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/user.entity';

@Controller('auth')
export class AuthController {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  @Post('login')
  async login(@Body() body: { username: string; password: string }) {
    console.log('Login body:', body);
    const user = await this.userRepository.findOneBy({ username: body.username });
    console.log('User found:', user);
    if (!user || user.password.trim() !== body.password.trim()) {
      return { success: false, error: 'Usuario o contraseña incorrectos.' };
    }
    return { success: true, user: { id: user.id, username: user.username } };
  }
}
