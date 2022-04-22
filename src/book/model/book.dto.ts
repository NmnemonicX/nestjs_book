import { IsOptional, IsString, MaxLength, MinLength } from 'class-validator';

export class IBookDTO {
  @IsString()
  @MinLength(3)
  @MaxLength(15)
  title: string;
  @IsString()
  @IsOptional()
  description: string;
  @IsString()
  @IsOptional()
  authors: string;
  @IsString()
  @IsOptional()
  favorite: string;
  @IsString()
  @IsOptional()
  fileCover: string;
  @IsString()
  @IsOptional()
  fileName: string;
  @IsString()
  @IsOptional()
  fileBook: string;
}
