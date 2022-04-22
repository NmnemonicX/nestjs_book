import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class book_paramsPipePipe implements PipeTransform<string, number> {
  transform(value: any, metadata: ArgumentMetadata): number {

    if (value.length < 10) {
      throw new BadRequestException('Validation failed: коротковат id');
    }

    return value;
  }
}
