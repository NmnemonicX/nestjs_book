import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { BookCommentService } from './book-comment.service';
import { BookCommentDto } from './dto/book-comment.dto';

@Controller('book-comment')
export class BookCommentController {
  constructor(private readonly bookCommentService: BookCommentService) {}

  @Post()
  create(@Body() createBookCommentDto: BookCommentDto) {
    return this.bookCommentService.create(createBookCommentDto);
  }

  @Get()
  findAll() {
    return this.bookCommentService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.bookCommentService.findOne(id);
  }

  // @Patch(':id')
  // update(
  //   @Param('id') id: string,
  //   @Body() updateBookCommentDto: BookCommentDto,
  // ) {
  //   return this.bookCommentService.update(+id, updateBookCommentDto);
  // }
  //
  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.bookCommentService.remove(+id);
  // }
}
