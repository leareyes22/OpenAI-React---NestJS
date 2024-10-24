import OpenAI from 'openai';
import { convertToBase64 } from 'src/helpers';

interface Options {
  prompt?: string;
  imageFile: Express.Multer.File;
}

export const imageToTextUseCase = async (openai: OpenAI, options: Options) => {
  const { imageFile, prompt } = options;

  const response = await openai.chat.completions.create({
    model: 'gpt-4-turbo',
    max_tokens: 1000,
    messages: [
      {
        role: 'user',
        content: [
          { type: 'text', text: prompt ?? 'Qué logras ver en la imagen?' },
          { type: 'image_url', image_url: { url: convertToBase64(imageFile) } },
        ],
      },
    ],
  });

  return { msg: response.choices[0].message.content };
};
