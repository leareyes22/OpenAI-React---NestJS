import { useState, Fragment } from "react";
import { v4 } from "uuid";
import {
  GptMessage,
  MyMessage,
  TypingLoader,
  TextMessageBox,
  GptMessageSelectableImage,
} from "../../components";
import {
  imageGenerationUseCase,
  imageVariationUseCase,
} from "../../../core/use-cases";

interface Message {
  text: string;
  isGpt: boolean;
  info?: {
    imageUrl: string;
    alt: string;
  };
}

export const ImageTunningPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      isGpt: true,
      text: "Imagen base",
      info: {
        alt: "Imagen base",
        imageUrl:
          "http://localhost:3000/gpt/image-generation/698cbdc3-6fda-41a8-a9bf-99b97e16e965.png",
      },
    },
  ]);

  const [originalImageAndMask, setOriginalImageAndMask] = useState({
    original: undefined as string | undefined,
    mask: undefined as string | undefined,
  });

  const handleVariation = async () => {
    setIsLoading(true);
    const response = await imageVariationUseCase(
      originalImageAndMask.original!
    );
    setIsLoading(false);

    if (!response) return;

    setMessages((prev) => [
      ...prev,
      {
        text: "Variación",
        isGpt: true,
        info: {
          imageUrl: response.url,
          alt: response.alt,
        },
      },
    ]);
  };

  const handlePost = async (text: string) => {
    setIsLoading(true);
    setMessages((prev) => [...prev, { text: text, isGpt: false }]);

    const { original, mask } = originalImageAndMask;

    const imageInfo = await imageGenerationUseCase(text, original, mask);
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
    <Fragment>
      {originalImageAndMask.original ? (
        <div className="fixed flex flex-col items-center top-10 right-10 z-10 fade-in">
          <span>Editando</span>
          <img
            className="border rounded-xl w-36 h-36 object-contain"
            src={originalImageAndMask.mask ?? originalImageAndMask.original}
            alt="Imagen original."
          />
          <button className="btn-primary mt-2" onClick={handleVariation}>
            Generar variación
          </button>
        </div>
      ) : null}
      <div className="chat-container">
        <div className="chat-messages">
          <div className="grid grid-cols-12 gap-y-2">
            <GptMessage text={"Qué imagen deseas generar hoy?"} />
            {messages.length > 0
              ? messages.map((message) => {
                  return message.isGpt ? (
                    <GptMessageSelectableImage
                      text={message.text}
                      key={v4()}
                      imageUrl={message.info!.imageUrl!}
                      alt={message.info!.alt!}
                      onImageSelected={(maskImageUrl) =>
                        setOriginalImageAndMask({
                          original: message.info!.imageUrl!,
                          mask: maskImageUrl,
                        })
                      }
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
    </Fragment>
  );
};
