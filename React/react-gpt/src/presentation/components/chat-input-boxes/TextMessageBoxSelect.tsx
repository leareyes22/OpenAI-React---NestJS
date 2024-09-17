import { FormEvent, useState } from "react";

interface Props {
  onSendMessage: (selectedOption: string, message: string) => void;
  placeholder?: string;
  disableCorrections?: boolean;
  options: Option[];
}

interface Option {
  id: string;
  text: string;
}

export const TextMessageBoxSelect = ({
  onSendMessage,
  placeholder,
  disableCorrections = false,
  options,
}: Props) => {
  const [message, setMessage] = useState("");
  const [selectedOption, setSelectedOption] = useState("");

  const handleSendMessage = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (message.trim().length === 0) return;
    if (selectedOption === "") return;

    onSendMessage(message, selectedOption);
  };

  return (
    <form
      onSubmit={handleSendMessage}
      className="flex flex-row items-center h-16 rounded-xl bg-white w-full px-4"
    >
      <div className="flex-grow">
        <div className="flex">
          <input
            type="text"
            autoFocus
            name="message"
            className="w-full border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h10"
            placeholder={placeholder}
            autoComplete={disableCorrections ? "on" : "off"}
            autoCorrect={disableCorrections ? "on" : "off"}
            spellCheck={disableCorrections ? "true" : "false"}
            onChange={(e) => setMessage(e.target.value)}
          />
          <select
            name="select"
            className="w-2/5 ml-5 border rounded-xl text-gray-800 focus:outline-none focus:border-indigo-300 pl-4 h-10"
            onChange={(e) => setSelectedOption(e.target.value)}
          >
            <option value="">{"Seleccione"}</option>
            {options.length > 0
              ? options.map(({ id, text }) => {
                  return (
                    <option key={id} value={id}>
                      {text}
                    </option>
                  );
                })
              : null}
          </select>
        </div>
      </div>

      <div className="ml-4">
        <button className="btn-primary">
          <i className="ml-2 fa-regular fa-paper-plane" />
        </button>
      </div>
    </form>
  );
};
