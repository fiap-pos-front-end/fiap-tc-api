import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../../common/prisma.module';
import { S3Service } from '../../services/s3.service';

@Module({
  imports: [PrismaModule],
  providers: [TransactionsService, S3Service],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
