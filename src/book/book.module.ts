import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { BookFirebaseService } from './book-firebase.service';
import { firestore } from 'firebase-admin';
import Firestore = firestore.Firestore;

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, BookFirebaseService, Firestore],
})
export class BookModule {}
