import { IsOptional, IsString } from 'class-validator';

export class ImageToTextDto {
  @IsString()
  @IsOptional()
  readonly prompt: string;

  imageFile: Express.Multer.File;
}
