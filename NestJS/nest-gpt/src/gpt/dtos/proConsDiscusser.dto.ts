import { IsString } from 'class-validator';

export class ProConsDiscusserDto {
  @IsString()
  readonly prompt: string;
}
