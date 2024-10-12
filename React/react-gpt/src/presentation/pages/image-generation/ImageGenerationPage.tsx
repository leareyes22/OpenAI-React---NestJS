import { useState } from "react";
import { v4 } from "uuid";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  GptMessageImage,
  TextMessageBox,
} from "../../components";
import { imageGenerationUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageGenerationPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const imageInfo = await imageGenerationUseCase(text);
    setIsLoading(false);

    if (!imageInfo) {
      return setMessages((prev) => [
        ...prev,
        { text: "No se pudo generar la imagen deseada.", isGpt: true },
      ]);
    }

    const { url, alt } = imageInfo;

    setMessages((prev) => [
      ...prev,
      {
        text: text,
        isGpt: true,
        info: { imageUrl: url, alt: alt },
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text={"Qué imagen deseas generar hoy?"} />
          {messages.length > 0
            ? messages.map((message) => {
                return message.isGpt ? (
                  <GptMessageImage
                    key={v4()}
                    imageUrl={message.info!.imageUrl}
                    alt={message.info!.alt}
                  />
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
