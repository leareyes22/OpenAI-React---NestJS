export const prosConsDiscusserStreamUseCase = async (prompt: string) => {
  try {
    const response = await fetch(
      `${import.meta.env.VITE_GPT_API}/pro-cons-discusser-stream`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      }
    );

    if (!response.ok)
      throw new Error("No se pudo realizar la comparación de pros y contras.");

    const reader = response.body?.getReader();

    if (!reader) throw new Error("No se pudo generar el reader.");

    return reader;
  } catch (error) {
    console.error(error);
    return null;
  }
};
