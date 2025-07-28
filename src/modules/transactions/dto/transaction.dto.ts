import {
  IsNumber,
  IsDateString,
  IsOptional,
  IsInt,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class TransactionDto {
  @ApiProperty({ example: 'Receita' })
  @IsString()
  type: string;

  @ApiProperty({ example: '2025-12-31T20:59:59-03:00' })
  @IsDateString()
  date: string;

  @ApiProperty({ example: 100.15 })
  @IsNumber()
  amount: number;

  @IsOptional()
  @IsString()
  attachments?: string;

  @ApiProperty({ example: 1 })
  @IsInt()
  categoryId: number;
}
