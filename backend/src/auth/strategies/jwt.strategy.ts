import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Role } from '../../roles/entities/role.entity';
import { User } from '../../users/entities/user.entity';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'tu_secreto_super_seguro', // debe coincidir con JwtModule
    });
  }

  async validate(payload: { sub: number; email: string; rol: Role }): Promise<Partial<User>> {
    return { id: payload.sub, email: payload.email };
  }
}
