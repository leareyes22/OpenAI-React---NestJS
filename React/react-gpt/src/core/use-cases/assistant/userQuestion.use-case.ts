import axios from "axios";
import { QuestionResponse } from "../../../interfaces";

interface Options {
  threadId: string;
  question: string;
}

export const userQuestionUseCase = async (options: Options) => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_ASSISTANT_API}/user-question`,
      options
    );

    const messages = response.data as Array<QuestionResponse>;

    return messages;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating thread.");
  }
};
