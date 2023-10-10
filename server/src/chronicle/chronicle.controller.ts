import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { ChronicleService } from './chronicle.service';
import { CreateChronicleDto } from './dto/create-chronicle.dto';
import { isMonth } from 'src/utils/isMonth';
import { CreateChronicleEventDto } from './dto/create-chronicle-event.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname } from 'path';
import { v4 } from 'uuid';
import { isNumber } from 'src/utils/isNumber';

@Controller('chronicle')
export class ChronicleController {
  constructor(private readonly chronicleService: ChronicleService) {}

  @Get('')
  async getAll() {
    return await this.chronicleService.getAll();
  }

  @Get('getOne')
  async getOne(@Query('skip') skip) {
    return this.chronicleService.getOne(+skip);
  }

  @Get('count')
  async getCount() {
    return this.chronicleService.getCount();
  }

  @Post('')
  async create(@Body() dto: CreateChronicleDto) {
    if (!isMonth(dto.month)) {
      throw new BadRequestException('invalid month');
    }

    return await this.chronicleService.create(dto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return await this.chronicleService.delete(+id);
  }

  @Get(':id')
  async getChroincle(@Param('id') id: string) {
    return await this.chronicleService.getChroincle(+id);
  }

  @Post(':id')
  @UseInterceptors(
    FileInterceptor('img', {
      storage: diskStorage({
        destination: './static',
        filename: (req, file, callback) => {
          const ext = extname(file.originalname);
          const imgName = v4() + ext;
          callback(null, imgName);
        },
      }),
    }),
  )
  async createEvent(
    @Body() dto: CreateChronicleEventDto,
    @UploadedFile() img: Express.Multer.File,
    @Param('id') id: string,
  ) {
    if (!dto.text && !img) {
      throw new BadRequestException('text or img is required');
    }

    if (!isNumber(dto.day)) {
      throw new BadRequestException('day must be number');
    }

    return await this.chronicleService.createEvent(+id, dto, img);
  }

  @Delete('/event/:id')
  async deleteEvent(@Param('id') id: string) {
    return await this.chronicleService.deleteEvent(+id);
  }
}
