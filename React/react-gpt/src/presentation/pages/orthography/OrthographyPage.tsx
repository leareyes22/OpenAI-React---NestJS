import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptOrthographyMessage,
} from "../../components";
import { v4 } from "uuid";
import { orthographyUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    userScore: number;
    errors: string[];
    message: string;
  };
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, errors, userScore, message } = await orthographyUseCase(text);
    if (!ok) {
      setMessages((prev) => [
        ...prev,
        { text: "No se pudo realizar la corrección.", isGpt: true },
      ]);
    } else {
      setMessages((prev) => [
        ...prev,
        {
          text: message,
          isGpt: true,
          info: {
            errors,
            userScore,
            message,
          },
        },
      ]);
    }

    setIsLoading(false);

    // TODO: Añadir el mensaje de isGpt en true
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage
            text={
              "Hola, puedes escribir tu texto en español, y te ayudo con las correcciones."
            }
          />
          {messages.length > 0
            ? messages.map((message) => {
                return message.isGpt ? (
                  <GptOrthographyMessage key={v4()} {...message.info!} />
                ) : (
                  <MyMessage key={v4()} text={message.text} />
                );
              })
            : null}
          {isLoading ? (
            <div className="col-start-1">
              <TypingLoader className="fade-in" />
            </div>
          ) : null}
        </div>
      </div>

      <TextMessageBox
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections
      />

      {/*<TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
      />

      <TextMessageBoxSelect
        onSendMessage={console.log}
        options={[
          { id: "1", text: "Hola" },
          { id: "2", text: "Mundo" },
        ]}
      />*/}
    </div>
  );
};
