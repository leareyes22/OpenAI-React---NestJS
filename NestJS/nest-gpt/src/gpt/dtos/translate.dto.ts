import { IsString } from 'class-validator';

export class TranslateDto {
  @IsString()
  prompt: string;

  @IsString()
  lang: string;
}
