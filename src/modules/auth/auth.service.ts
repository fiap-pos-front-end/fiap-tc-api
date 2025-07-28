import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserNoId } from './types/user';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(user: UserNoId) {
    const userExists = await this.usersService.findByEmail(user.email);
    if (!userExists)
      throw new UnauthorizedException('Usuário e/ou Senha Inválidos!');

    const match = await bcrypt.compare(user.password, userExists.password);
    if (!match)
      throw new UnauthorizedException('Usuário e/ou Senha Inválidos!');

    const payload = { sub: userExists.id, email: userExists.email };
    return { access_token: this.jwtService.sign(payload) };
  }

  async register(user: UserNoId) {
    const hash = await bcrypt.hash(user.password, 10);
    const userCreated = await this.usersService.create({
      email: user.email,
      password: hash,
    });
    if (!userCreated) return;

    const payload = { sub: userCreated.id, email: userCreated.email };
    return { access_token: this.jwtService.sign(payload) };
  }
}
