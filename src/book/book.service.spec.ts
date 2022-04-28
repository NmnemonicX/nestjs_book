import { Test, TestingModule } from '@nestjs/testing';
import { BookService } from './book.service';
import { Model } from 'mongoose';
import { getModelToken } from '@nestjs/mongoose';
import { Book } from './entities/book.entity';


const mockBook = {
  title: 'test_linux guru',
  description: 'test_for admins',
  authors: 'test_and me',
  favorite: 'test_aaa',
  fileCover: 'test_Cover2',
  fileName: 'test_lnx.doc',
  fileBook: 'test_',
};

describe('BookService', () => {
  let service: BookService;
  let model: Model<Book>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        BookService,
        {
          provide: getModelToken('Book'),
          useValue: {
            new: jest.fn().mockResolvedValue(mockBook),
            constructor: jest.fn().mockResolvedValue(mockBook),
            find: jest.fn(),
            exec: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<BookService>(BookService);
    model = module.get<Model<Book>>(getModelToken('Book'));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should insert a new book', async () => {
    jest.spyOn(model, 'create').mockImplementationOnce(() =>
      Promise.resolve({
        title: 'test_insert_linux guru',
        description: 'test_insert_for admins',
        authors: 'test_insert_and me',
        favorite: 'test_insert_aaa',
        fileCover: 'test_insert_Cover2',
        fileName: 'test_insert_lnx.doc',
        fileBook: 'test_insert_',
      }),
    );

    const newBook = await service.create({
      title: 'test_create_linux guru',
      description: 'test_create_for admins',
      authors: 'test_create_and me',
      favorite: 'test_create_aaa',
      fileCover: 'test_create_Cover2',
      fileName: 'test_create_lnx.doc',
      fileBook: 'test_create_',
    });
    expect(newBook).toEqual(mockBook);
  });
});
