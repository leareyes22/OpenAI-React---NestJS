import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import {
  audioToTextUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateStreamUseCase,
  translateUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  OrthographyDto,
  ProConsDiscusserDto,
  TextToAudioDto,
  TranslateDto,
} from './dtos';

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
    return await prosConsDiscusserUseCase(this.openai, {
      prompt: proConsDiscusserDto.prompt,
    });
  }

  async proConsDiscusserStream(proConsDiscusserDto: ProConsDiscusserDto) {
    return await prosConsDiscusserStreamUseCase(this.openai, {
      prompt: proConsDiscusserDto.prompt,
    });
  }

  async translate(translateDto: TranslateDto) {
    return await translateUseCase(this.openai, {
      lang: translateDto.lang,
      prompt: translateDto.prompt,
    });
  }

  async translateStream(translateDto: TranslateDto) {
    return await translateStreamUseCase(this.openai, {
      lang: translateDto.lang,
      prompt: translateDto.prompt,
    });
  }

  async textToAudio(textToAudioDto: TextToAudioDto) {
    return await textToAudioUseCase(this.openai, {
      prompt: textToAudioDto.prompt,
      voice: textToAudioDto.voice,
    });
  }

  async textToAudioGetter(fileId: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/audios',
      `${fileId}.mp3`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${fileId} not found.`);

    return filePath;
  }

  async audioToText(audioToTextDto: AudioToTextDto) {
    return await audioToTextUseCase(this.openai, {
      audioFile: audioToTextDto.audioFile,
      prompt: audioToTextDto.prompt,
    });
  }
}
