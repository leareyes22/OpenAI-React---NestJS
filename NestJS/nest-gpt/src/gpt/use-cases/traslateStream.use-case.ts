import OpenAI from 'openai';

interface Options {
  prompt: string;
  lang: string;
}

export const translateStreamUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { lang, prompt } = options;

  return await openai.chat.completions.create({
    stream: true,
    model: 'gpt-4o-mini',
    temperature: 0.2,
    max_tokens: 500,
    messages: [
      {
        role: 'system',
        content: `Traduce el siguiente texto al idioma ${lang}:${prompt}`,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });
};
