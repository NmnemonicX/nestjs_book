import { Test, TestingModule } from '@nestjs/testing';
import { BookController } from './book.controller';
import { BookService } from './book.service';
import { BookModule } from './book.module';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema} from "./entities/book.entity";

describe('BookController', () => {
  let app: INestApplication;
  let bookController: BookController;
  const bookService = {
    findAll: () => ['test'],
  };

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      controllers: [BookController],
      imports: [
        BookModule,
        MongooseModule.forFeature([
          {
            name: Book.name,
            schema: BookSchema,
          },
        ])],

    })
      .overrideProvider(BookService)
      .useValue(bookService)
      .compile();
    bookController = await moduleRef.resolve<BookController>(BookController);
    app = moduleRef.createNestApplication();
    await app.init();
  });

  it('/GET books', () => {
    return request(app.getHttpServer()).get('/book').expect(200).expect({
      data: bookService.findAll(),
    });
  });
  afterAll(async () => {
    await app.close();
  });
});
