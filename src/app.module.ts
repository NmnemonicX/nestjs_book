import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { MongooseModule } from '@nestjs/mongoose';
import { FirebaseModule } from 'nestjs-firebase';

const GOOGLE_APPLICATION_CREDENTIALS =
  './key/nestjs-book-firebase-adminsdk-87rh2-ac5589d0db.json';
@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/demo'),
    BookModule,
    FirebaseModule.forRoot({
      googleApplicationCredential: GOOGLE_APPLICATION_CREDENTIALS,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
