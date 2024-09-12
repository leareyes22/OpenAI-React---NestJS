import { useState } from "react";
import { v4 } from "uuid";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { prosConsDiscusserUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const ProsConsPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { ok, content } = await prosConsDiscusserUseCase(text);

    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      {
        text: content,
        isGpt: true,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage
            text={
              "Puedes escribir lo que sea que quieras que compare y te de mis puntos de vista."
            }
          />
          {messages.length > 0
            ? messages.map((message) => {
                return message.isGpt ? (
                  <GptMessage key={v4()} text={message.text} />
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
        disableCorrections={true}
      />
    </div>
  );
};
