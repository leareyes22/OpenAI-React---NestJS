import OpenAI from 'openai';

interface Options {
  prompt: string;
}

export const orthographyCheckUseCase = async (
  openai: OpenAI,
  options: Options,
) => {
  const { prompt } = options;

  const completion = await openai.chat.completions.create({
    model: 'gpt-4o-mini',
    temperature: 0.3,
    max_tokens: 150,
    response_format: {
      type: 'json_object',
    },
    messages: [
      {
        role: 'system',
        content: `Te serán proveídos textos con posibles errores ortográficos y gramaticales,
        Las palabras usadas deben de existir en el diccionario de la Real Academia Española,
        Debes de responder en formato JSON,
        Tu tarea es corregirlos y retornar información soluciones,
        También debes de dar un porcentaje de acierto por el usuario,

        Si no hay errores, debes de retornar un mensaje de felicitaciones.

        Ejemplo de salida:
        {
          userScore: number,
          errors: string[], // ['error -> solución']
          message: strong, // usa emojis y texto para felicitar al usuario
        }
        `,
      },
      {
        role: 'user',
        content: prompt,
      },
    ],
  });

  const jsonResponse = JSON.parse(completion.choices[0].message.content);

  return jsonResponse;
};
