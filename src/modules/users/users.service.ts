import { BadRequestException, Injectable } from '@nestjs/common';
import { UserNoId } from '../auth/types/user';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({ where: { email } });
  }

  async create(data: UserNoId) {
    const exists = await this.findByEmail(data.email);

    if (exists)
      throw new BadRequestException('Este e-mail já está sendo utilizado!');

    return await this.prisma.user.create({ data });
  }
}
