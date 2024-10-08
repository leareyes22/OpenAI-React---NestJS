import axios from "axios";
import { AudioToTextResponse } from "../../interfaces";

export const audioToTextUseCase = async (prompt: string, file: File) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    if (prompt) {
      formData.append("prompt", prompt);
    }

    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/audio-to-text`,
      formData,
      { headers: { "Content-Type": "multipart/form-data" } }
    );

    if (!response)
      throw new Error(
        "No se pudo generar el texto con el archivo de audio subido."
      );

    const data = response.data as AudioToTextResponse;

    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
};
