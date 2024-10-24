import axios from "axios";

type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

export const imageGenerationUseCase = async (
  prompt: string,
  originalImage?: string,
  maskImage?: string
): Promise<GeneratedImage> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/image-generation`,
      { prompt, originalImage, maskImage }
    );

    if (!response) throw new Error("No se pudo generar la imagen deseada.");

    const { url, revised_prompt: alt } = response.data;

    return { url, alt };
  } catch (error) {
    console.error(error);
    return null;
  }
};
