import { useState } from "react";
import { v4 } from "uuid";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxFile,
} from "../../components";
import { audioToTextUseCase } from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
}

export const AudioToTextPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, file: File) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const response = await audioToTextUseCase(text, file);
    if (!response) return;

    const gptMessage = `
## Transcripción:
__Duración:__ ${Math.round(response.duration)} segundos
## El texto es:
${response.text}    
`;

    setMessages((prev) => [
      ...prev,
      {
        text: gptMessage,
        isGpt: true,
      },
    ]);

    for (const segment of response.segments) {
      const segmentMessage = `
__De ${Math.round(segment.start)} a ${Math.round(segment.end)} segundos:__
${segment.text}
`;

      setMessages((prev) => [
        ...prev,
        {
          text: segmentMessage,
          isGpt: true,
        },
      ]);
    }

    setIsLoading(false);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage
            text={
              "Hola, puedes subir tu archivo de audio aquí, y yo te lo transcribo."
            }
          />
          {messages.length > 0
            ? messages.map((message) => {
                return message.isGpt ? (
                  <GptMessage key={v4()} text={message.text} />
                ) : (
                  <MyMessage
                    key={v4()}
                    text={
                      message.text === "" ? "Transcribe el audio" : message.text
                    }
                  />
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
      <TextMessageBoxFile
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas"
        disableCorrections={true}
        accept="audio/*"
      />
    </div>
  );
};
