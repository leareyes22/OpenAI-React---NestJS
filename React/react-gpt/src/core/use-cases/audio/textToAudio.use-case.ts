import axios from "axios";

export const textToAudioUseCase = async (prompt: string, voice: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/text-to-audio`,
      { prompt, voice },
      { responseType: "blob" }
    );

    if (!response)
      throw new Error("No se pudo generar el audio con la voz seleccionada.");

    const audioFile = response.data;
    const audioUrl = URL.createObjectURL(audioFile);

    return {
      ok: true,
      message: prompt,
      audioUrl,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      message: "No se pudo generar el audio con la voz seleccionada.",
    };
  }
};
