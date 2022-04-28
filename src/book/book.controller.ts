import {
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { BookService } from './book.service';
import { IBookDTO } from './model/book.dto';
import { BookDocument } from './entities/book.entity';
import { BookInterceptor } from '../Interceptors/book.Interceptor';
import { book_paramsPipePipe } from '../pipes/book_params.pipe';
import { Book_bodyPipe } from '../pipes/book_body.pipe';
import { JwtAuthGuard } from '../Guards/jwt-auth.guard';

@UseInterceptors(BookInterceptor)
@Controller('book')
export class BookController {
  constructor(private readonly bookService: BookService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  findAll() {
    // throw new Error('для тестирования ошибок');
    return this.bookService.findAll();
  }

  @Get(':id')
  @UsePipes(book_paramsPipePipe)
  findOne(@Param('id') id: string) {
    return this.bookService.findOne(id);
  }

  @Post()
  @UsePipes(new Book_bodyPipe())
  async create(@Body() Dto: IBookDTO) {
    await this.bookService.create(Dto);
  }

  @Put(':id')
  async updateBook(
    @Param('id') id: string,
    @Body() body: IBookDTO,
  ): Promise<BookDocument> {
    return this.bookService.update(id, body);
  }

  @Delete(':id')
  async deleteBook(@Param('id') id: string): Promise<BookDocument> {
    return this.bookService.delete(id);
  }
}
