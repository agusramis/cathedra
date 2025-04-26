import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  async login(@Body() body: { email: string; password: string }) {
    const token = await this.authService.validateUserAndGenerateToken(body.email, body.password);
    if (!token) {
      throw new UnauthorizedException('Credenciales inválidas');
    }
    return { access_token: token };
  }
}
