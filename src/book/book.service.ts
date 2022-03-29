import { Injectable } from '@nestjs/common';

import { Book } from './model/book.model';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { BookDocument } from './entities/book.entity';
import { Model, Connection } from 'mongoose';
import { IBookDTO } from './model/book.dto';

@Injectable()
export class BookService {
  private readonly books: Book[] = [];

  constructor(
    @InjectModel(Book.name)
    private BookModel: Model<BookDocument>,
    @InjectConnection()
    private connection: Connection,
  ) {
    this.books = [
      {
        id: 1,
        title: 'windows guru',
        description: 'for users',
        authors: 'i am',
        favorite: 'what',
        fileCover: 'Cover',
        fileName: 'win1.doc',
        fileBook: '',
      },
      {
        id: 2,
        title: 'linux guru',
        description: 'for admins',
        authors: 'and me',
        favorite: 'aaa',
        fileCover: 'Cover2',
        fileName: 'lnx.doc',
        fileBook: '',
      },
    ];
  }

  findAll(): Promise<BookDocument[]> {
    return this.BookModel.find().exec();
  }

  findOne(id: number) {
    return this.BookModel.findById({ _id: id }).exec();
  }

  create(dto: IBookDTO): Promise<BookDocument> {
    const book = new this.BookModel(dto);
    return book.save();
  }
  update(id: number, data: IBookDTO): Promise<BookDocument> {
    return this.BookModel.findOneAndUpdate({ _id: id }, data).exec();
  }

  delete(id: number): Promise<BookDocument> {
    return this.BookModel.findByIdAndDelete({ _id: id }).exec();
  }
}
