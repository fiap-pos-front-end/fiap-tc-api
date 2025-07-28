import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from './dto/category.dto';
import { UserId } from 'src/decorators/user-id.decorator';

@ApiTags('categories')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private service: CategoriesService) {}

  @Post()
  async create(@Body() dto: CategoryDto, @UserId() userId: number) {
    return await this.service.create(dto, userId);
  }

  @Get()
  async findAll(@UserId() userId: number) {
    return await this.service.findAll(userId);
  }

  @Get(':id')
  async findOne(@Param('id') id: number, @UserId() userId: number) {
    return await this.service.findOne(+id, userId);
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() dto: CategoryDto,
    @UserId() userId: number,
  ) {
    return await this.service.update(+id, dto, userId);
  }

  @Delete(':id')
  async remove(@Param('id') id: number, @UserId() userId: number) {
    return await this.service.remove(+id, userId);
  }
}
