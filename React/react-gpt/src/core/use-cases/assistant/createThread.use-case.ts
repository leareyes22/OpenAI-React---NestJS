import axios from "axios";

export const createThreadUseCase = async () => {
  try {
    const response = await axios.post(
      `${import.meta.env.VITE_ASSISTANT_API}/create-thread`
    );

    const { id } = response.data as { id: string };

    return id;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating thread.");
  }
};
