import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { S3Service } from '../../services/s3.service';
import { TransactionDto } from './dto/transaction.dto';
import { PrismaService } from 'src/common/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(
    private prisma: PrismaService,
    private s3: S3Service,
  ) {}

  async getTotalBalance(userId: number) {
    const [receitas, despesas] = await Promise.all([
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'Receita', userId },
      }),
      this.prisma.transaction.aggregate({
        _sum: { amount: true },
        where: { type: 'Despesa', userId },
      }),
    ]);

    const totalReceitas = receitas?._sum.amount || 0;
    const totalDespesas = despesas?._sum.amount || 0;

    return totalReceitas - totalDespesas;
  }

  async create(dto: TransactionDto, userId: number) {
    return await this.prisma.transaction.create({
      data: {
        type: dto.type,
        date: new Date(dto.date),
        amount: dto.amount,
        attachments: '',
        categoryId: dto.categoryId,
        userId,
      },
    });
  }

  async findAll(userId: number) {
    return await this.prisma.transaction.findMany({
      where: { userId },
      include: {
        category: true,
      },
    });
  }

  async findOne(id: number, userId: number) {
    const transaction = await this.prisma.transaction.findFirst({
      where: { id, userId },
      include: {
        category: true,
      },
    });

    if (!transaction)
      throw new NotFoundException('Transactionência não encontrada!');

    return transaction;
  }

  async findAllAttachments(id: number, userId: number) {
    const transaction = await this.findOne(id, userId);

    const urlsS3 = transaction.attachments.split(';');

    const result: any[] = [];
    for (let i = 0; i < urlsS3.length; i++) {
      result.push(await this.s3.getAttachments(urlsS3[i]));
    }

    return result;
  }

  async update(id: number, data: any, userId: number) {
    await this.findOne(id, userId);

    return await this.prisma.transaction.update({
      where: { id },
      data,
    });
  }
  async uploadAttachments(
    id: number,
    files: Express.Multer.File[],
    userId: number,
  ) {
    const transaction = await this.findOne(id, userId);
    const urls = await Promise.all(
      files.map((f, index) => this.s3.uploadAttachment(id, f, index + 1)),
    );
    if (!urls)
      throw new InternalServerErrorException(
        'Não foi possível fazer o upload do(s) arquivo(s)!',
      );

    const transactionNoId = {
      type: transaction.type,
      date: transaction.date,
      amount: transaction.amount,
      attachments: urls.join(';'),
      categoryId: transaction.categoryId,
    };
    await this.update(id, transactionNoId, userId);

    return true;
  }

  async remove(id: number, userId: number) {
    await this.findOne(id, userId);

    return await this.prisma.transaction.delete({ where: { id } });
  }
}
