import { Injectable } from '@nestjs/common';
import { BookCommentDto } from './dto/book-comment.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  BookComment,
  BookCommentDocument,
} from './entities/book-comment.entity';
import { Connection, Model } from 'mongoose';
import {BookDocument} from "../book/entities/book.entity";

@Injectable()
export class BookCommentService {
  constructor(
    @InjectModel(BookComment.name)
    private BookCommentModel: Model<BookCommentDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {}

  create(createBookCommentDto: BookCommentDto): Promise<BookCommentDocument> {
    const bookComment = new this.BookCommentModel(createBookCommentDto);
    return bookComment.save();
  }

  findAllBookComment(bookId: string): Promise<BookCommentDocument[]> {
    return this.BookCommentModel.find({ bookId }).exec();
  }

  findAll(): Promise<BookCommentDocument[]> {
    return this.BookCommentModel.find().exec();
  }

  findOne(id: string) {
    return this.BookCommentModel.findById({ _id: id }).exec();
  }

  // update(id: number, updateBookCommentDto: BookCommentDto) {
  //   return `This action updates a #${id} bookComment`;
  // }
  //
  // remove(id: number) {
  //   return `This action removes a #${id} bookComment`;
  // }
}
