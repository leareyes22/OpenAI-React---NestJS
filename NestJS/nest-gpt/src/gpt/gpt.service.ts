import * as path from 'path';
import * as fs from 'fs';
import { Injectable, NotFoundException } from '@nestjs/common';
import OpenAI from 'openai';
import { ImageGenerationDto } from './dtos/imageGeneration.dto';
import { ImageVariationDto } from './dtos/imageVariation.dto';
import {
  audioToTextUseCase,
  imageGenerationUseCase,
  imageVariationUseCase,
  imageToTextUseCase,
  orthographyCheckUseCase,
  prosConsDiscusserStreamUseCase,
  prosConsDiscusserUseCase,
  textToAudioUseCase,
  translateStreamUseCase,
  translateUseCase,
} from './use-cases';
import {
  AudioToTextDto,
  ImageToTextDto,
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

  async imageGeneration(imageGenerationDto: ImageGenerationDto) {
    return await imageGenerationUseCase(this.openai, imageGenerationDto);
  }

  async getGeneratedImage(filename: string) {
    const filePath = path.resolve(
      __dirname,
      '../../generated/images',
      `${filename}`,
    );

    const wasFound = fs.existsSync(filePath);

    if (!wasFound) throw new NotFoundException(`File ${filename} not found.`);

    return filePath;
  }

  async generateImageVariation(imageVariationDto: ImageVariationDto) {
    return imageVariationUseCase(this.openai, {
      baseImage: imageVariationDto.baseImage,
    });
  }

  async imageToText(imageToTextDto: ImageToTextDto) {
    return imageToTextUseCase(this.openai, {
      prompt: imageToTextDto.prompt,
      imageFile: imageToTextDto.imageFile,
    });
  }
}
