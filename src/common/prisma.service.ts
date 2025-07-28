import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  async onModuleInit() {
    await this.connectWithRetry();
  }

  private async connectWithRetry(retries = 5): Promise<void> {
    try {
      await this.$connect();
    } catch (err) {
      if (retries > 0) {
        await new Promise((res) => setTimeout(res, 3000));
        return this.connectWithRetry(retries - 1);
      }
      throw new Error(`Não conseguiu conectar após várias tentativas: ${err}`);
    }
  }

  async onModuleDestroy() {
    await this.$disconnect();
  }
}
