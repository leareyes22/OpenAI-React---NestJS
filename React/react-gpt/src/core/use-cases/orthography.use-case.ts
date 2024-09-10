import axios from "axios";
import { OrthographyResponse } from "../../interfaces";

export const orthographyUseCase = async (prompt: string) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_GPT_API}/orthography-check`,
      { prompt }
    );

    if (!response) throw new Error("No se pudo realizar la corrección");

    const data = response.data as OrthographyResponse;

    return {
      ok: true,
      ...data,
    };
  } catch (error) {
    console.error(error);
    return {
      ok: false,
      userScore: 0,
      errors: [],
      message: "No se pudo realizar la corrección.",
    };
  }
};
