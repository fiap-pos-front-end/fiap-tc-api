import {
  Controller,
  Post,
  Body,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { TransactionDto } from './dto/transaction.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@ApiTags('transactions')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('transactions')
export class TransactionsController {
  constructor(private service: TransactionsService) {}

  @Post()
  async create(@Body() dto: TransactionDto, @UserId() userId: number) {
    return await this.service.create(dto, userId);
  }

  @Get('getTotalBalance')
  async getTotalBalance(@UserId() userId: number) {
    return await this.service.getTotalBalance(userId);
  }

  @Get()
  async findAll(@UserId() userId: number) {
    return await this.service.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @UserId() userId: number) {
    return await this.service.findOne(+id, userId);
  }

  @Get(':id/attachments')
  async findAllAttachments(@Param('id') id: number, @UserId() userId: number) {
    return await this.service.findAllAttachments(+id, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: TransactionDto,
    @UserId() userId: number,
  ) {
    return await this.service.update(+id, dto, userId);
  }
  @Put(':id/attachments')
  @UseInterceptors(FilesInterceptor('files', 3))
  async uploadAttachments(
    @Param('id') id: number,
    @UploadedFiles() files: Express.Multer.File[],
    @UserId() userId: number,
  ) {
    return await this.service.uploadAttachments(+id, files, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @UserId() userId: number) {
    return await this.service.remove(+id, userId);
  }
}
