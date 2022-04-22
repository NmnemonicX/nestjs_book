import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Injectable()
export class Book_bodyPipe implements PipeTransform {
  async transform(value: any, { metatype }: ArgumentMetadata) {
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      throw new BadRequestException('Validation failed: ошибка получилась');
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Number];
    return !types.includes(metatype);
  }
}
