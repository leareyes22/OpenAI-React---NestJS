import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import {
  orthographyCheckUseCase,
  proConsDiscusserStreamUseCase,
  proConsDiscusserUseCase,
} from './use-cases';
import { OrthographyDto, ProConsDiscusserDto } from './dtos';

@Injectable()
export class GptService {
  // Solo va a llamar casos de uso
  private openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
  });

  async orthographyCheck(orthographyDto: OrthographyDto) {
    return await orthographyCheckUseCase(this.openai, {
      prompt: orthographyDto.prompt,
    });
  }

  async proConsDiscusser(proConsDiscusserDto: ProConsDiscusserDto) {
    return await proConsDiscusserUseCase(this.openai, {
      prompt: proConsDiscusserDto.prompt,
    });
  }

  async proConsDiscusserStream(proConsDiscusserDto: ProConsDiscusserDto) {
    return await proConsDiscusserStreamUseCase(this.openai, {
      prompt: proConsDiscusserDto.prompt,
    });
  }
}
