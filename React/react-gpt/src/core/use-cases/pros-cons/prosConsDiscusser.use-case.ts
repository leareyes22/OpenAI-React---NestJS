import axios from "axios";
import { ProsConsDiscusserResponse } from "../../../interfaces";

export const prosConsDiscusserUseCase = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/pro-cons-discusser`,
      { prompt }
    );

    if (!response)
      throw new Error("No se pudo realizar la comparación de pros y contras.");

    const data = response.data as ProsConsDiscusserResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      content: "No se pudo realizar la comparación de pros y contras.",
    };
  }
};
