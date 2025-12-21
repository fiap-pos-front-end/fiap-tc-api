import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/common/prisma.service';
import { CategoryDto } from './dto/category.dto';
import { CryptoService } from '../crypto/crypto.service';

@Injectable()
export class CategoriesService {
  constructor(
    private prisma: PrismaService,
    private cryptoService: CryptoService,
  ) {}

  async create(data: CategoryDto, userId: number) {
    const exists = await this.findByName(data.name, userId);
    if (exists)
      throw new BadRequestException(`A categoria "${data.name}" já existe!`);

     const category = await this.prisma.category.create({
      data: {
        name: this.cryptoService.encrypt(data.name),
        userId,
      },
    });

    return {
      ...category,
      name: this.cryptoService.decrypt(category.name),
    };
  }

  async findAll(userId: number) {
    const categories = await this.prisma.category.findMany({
      where: { userId },
    });

    return categories.map((c) => this.decryptCategory(c));
  }


  async findOne(id: number, userId: number) {
    const category = await this.prisma.category.findFirst({
      where: { id, userId },
    });

    if (!category)
      throw new NotFoundException('Categoria não encontrada!');

    return this.decryptCategory(category);
  }

  async findByName(name: string, userId: number) {
    const categories = await this.prisma.category.findMany({ where: { userId } });

    return categories
      .map(c => this.decryptCategory(c))
      .find(c => c.name === name) ?? null;
  }

  async update(id: number, data: CategoryDto, userId: number) {
    await this.findOne(id, userId);

    const category = await this.prisma.category.update({
      where: { id },
      data: {
        name: this.cryptoService.encrypt(data.name),
        userId,
      },
    });

    return {
      ...category,
      name: this.cryptoService.decrypt(category.name),
    };
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    try {
      return await this.prisma.category.delete({ where: { id } });
    } catch (error) {
      if (error.code === 'P2003') {
        throw new BadRequestException(
          'Categoria em uso. Não pode ser deletada.',
          'FK_ERROR',
        );
      }
      throw error;
    }
  }

  decryptCategory(category: any) {
    try {
      return {
        ...category,
        name: this.cryptoService.decrypt(category.name),
      };
    } catch (e) {
      console.error('Valor inválido para decrypt:', category.name);
      throw e;
    }
  }

}
