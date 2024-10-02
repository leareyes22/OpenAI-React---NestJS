import { useState } from "react";
import { v4 } from "uuid";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBoxSelect,
  GptMessageAudio,
} from "../../components";
import { textToAudioUseCase } from "../../../core/use-cases";

const displaimer = `## Qué audio quieres generar hoy?
* Todo el audio generado es por AI.
`;

const voices = [
  { id: "nova", text: "nova" },
  { id: "alloy", text: "alloy" },
  { id: "echo", text: "echo" },
  { id: "fable", text: "fable" },
  { id: "onyx", text: "onyx" },
  { id: "shimmer", text: "shimmer" },
];

interface TextMessage {
  text: string;
  isGpt: boolean;
  type: "text";
}

interface AudioMessage {
  text: string;
  isGpt: boolean;
  audio: string;
  type: "audio";
}

type Message = TextMessage | AudioMessage;

export const TextToAudioPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);

  const handlePost = async (text: string, selectedVoice: string) => {
    setIsLoading(true);
    const newMessage = `Genera el audio del texto: "${text} con la voz ${selectedVoice}`;
    setMessages((prev) => [
      ...prev,
      { text: newMessage, isGpt: false, type: "text" },
    ]);

    const { ok, message, audioUrl } = await textToAudioUseCase(
      text,
      selectedVoice
    );
    setIsLoading(false);

    if (!ok) return;

    setMessages((prev) => [
      ...prev,
      {
        text: `${selectedVoice} - ${message}`,
        isGpt: true,
        type: "audio",
        audio: audioUrl!,
      },
    ]);
  };

  return (
    <div className="chat-container">
      <div className="chat-messages">
        <div className="grid grid-cols-12 gap-y-2">
          <GptMessage text={displaimer} />
          {messages.length > 0
            ? messages.map((message: Message) => {
                return message.isGpt ? (
                  message.type === "audio" ? (
                    <GptMessageAudio
                      key={v4()}
                      text={message.text}
                      audio={message.audio}
                    />
                  ) : (
                    <GptMessage key={v4()} text={message.text} />
                  )
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
      <TextMessageBoxSelect
        onSendMessage={handlePost}
        placeholder="Escribe aquí lo que deseas traducir"
        options={voices}
      />
    </div>
  );
};
