import axios from "axios";
import { TranslateResponse } from "../../interfaces";

export const translateUseCase = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/pro-cons-discusser`,
      { prompt }
    );

    if (!response)
      throw new Error(
        "No se pudo realizar la traducción al idioma seleccionado."
      );

    const data = response.data as TranslateResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      content: "No se pudo realizar la traducción al idioma seleccionado.",
    };
  }
};
