import { Injectable } from '@nestjs/common';

import { Book } from './entities/book.entity';

@Injectable()
export class BookService {
  private readonly books: Book[] = [];

  constructor() {
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

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number) {
    return this.books.find((book) => book.id === id);
  }
}
