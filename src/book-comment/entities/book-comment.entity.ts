import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type BookCommentDocument = BookComment & Document;

@Schema()
export class BookComment {
  @Prop()
  id: string;

  @Prop()
  user: string;

  @Prop()
  bookId: string;

  @Prop()
  comment: string;
}

export const BookCommentSchema = SchemaFactory.createForClass(BookComment);
