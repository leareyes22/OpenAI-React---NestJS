import axios from "axios";

type GeneratedImage = Image | null;

interface Image {
  url: string;
  alt: string;
}

export const imageVariationUseCase = async (
  originalImage: string
): Promise<GeneratedImage> => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/image-generation-variation`,
      { baseImage: originalImage }
    );

    if (!response)
      throw new Error("No se pudo generar la variación de la imagen.");

    const { url, revised_prompt: alt } = response.data;

    return { url, alt };
  } catch (error) {
    console.error(error);
    return null;
  }
};
