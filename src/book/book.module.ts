import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Book, BookSchema } from './entities/book.entity';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { JwtStrategy } from '../auth/strategy/JwtStrategy';
import {AuthModule} from "../auth/auth.module";

@Module({
  imports: [
      AuthModule,
    ConfigModule.forRoot({
      envFilePath: '.development.env',
    }),
    JwtModule.register({
      secret: process.env.SECRET_KEY,
    }),
    MongooseModule.forFeature([
      {
        name: Book.name,
        schema: BookSchema,
      },
    ]),
  ],
  controllers: [BookController],
  providers: [BookService, JwtStrategy],
})
export class BookModule {}
