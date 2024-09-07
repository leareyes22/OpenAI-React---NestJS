import { useState } from "react";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
} from "../../components";
import { v4 } from "uuid";

interface Message {
  text: string;
  isGpt: boolean;
}

export const OrthographyPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    // TODO: UseCase - API call
    setTimeout(() => {
      setIsLoading(false);
    }, 5000);

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
