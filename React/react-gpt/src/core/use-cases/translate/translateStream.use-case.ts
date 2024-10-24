export async function* translateStreamGeneratorUseCase(
  lang: string,
  prompt: string,
  abortSignal: AbortSignal
) {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/translate-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ lang, prompt }),
        signal: abortSignal,
      }
    );

    if (!response.ok)
      throw new Error(
        "No se pudo realizar la traducción al idioma especificado."
      );

    const reader = response.body?.getReader();

    if (!reader) throw new Error("No se pudo generar el reader.");

    const decoder = new TextDecoder();
    let text = "";

    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      const decodedChunk = decoder.decode(value, { stream: true });
      text += decodedChunk;

      yield text;
    }
  } catch (error) {
    console.error(error);
    return null;
  }
}
