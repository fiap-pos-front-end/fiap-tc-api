import { Module } from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { TransactionsController } from './transactions.controller';
import { PrismaModule } from '../../common/prisma.module';
import { S3Service } from '../../services/s3.service';
import { CryptoModule } from '../crypto/crypto.module';

@Module({
  imports: [PrismaModule, CryptoModule],
  providers: [TransactionsService, S3Service],
  controllers: [TransactionsController],
})
export class TransactionsModule {}
