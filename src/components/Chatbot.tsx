import { useState, useEffect, useRef, useCallback } from "react";
import { MessageCircle, X, Maximize, Minimize } from "lucide-react";
import axios from "axios";

interface Message {
  text: string;
  isUser: boolean;
}

interface BotResponse {
  text: string;
}

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth", block: "end" });
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { text: input, isUser: true };
    setMessages((prev) => [...prev, userMessage]);

    setInput("");

    try {
      const response = await axios.post(
        "http://localhost:5005/webhooks/rest/webhook",
        {
          message: input,
          isUser: true,
        }
      );
      const botMessages = (response.data as BotResponse[]).map((res) => ({
        text: res.text,
        isUser: false,
      }));

      setMessages((prev) => [...prev, ...botMessages]);
    } catch (error: unknown) {
      console.error("Error fetching response:", error);

      let errorMessage = "Sorry, something went wrong!";

      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (
        typeof error === "object" &&
        error !== null &&
        "response" in error
      ) {
        const axiosError = error as {
          response?: { data?: { message?: string } };
        };
        errorMessage = axiosError.response?.data?.message || errorMessage;
      }

      setMessages((prev) => [...prev, { text: errorMessage, isUser: false }]);
    }
  };

  const toggleExpand = useCallback(() => setIsExpanded((prev) => !prev), []);
  const toggleChatbot = useCallback(() => setIsOpen((prev) => !prev), []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col items-end w-full sm:w-auto z-50">
      {isOpen && (
        <div
          className={`bg-white shadow-lg rounded-lg overflow-hidden transition-all h-[60vh] 
          ${isExpanded ? "w-[90vw] md:w-[40rem]" : "w-[80vw] sm:w-96"}
          flex flex-col border border-gray-200`}>
          <div className="bg-gray-100 p-3 flex justify-between items-center border-b">
            <span className="text-gray-700 font-semibold">Chat with us</span>
            <div className="flex gap-2">
              <button type="button" onClick={toggleExpand}>
                {isExpanded ? <Minimize size={18} /> : <Maximize size={18} />}
              </button>
              <button
                type="button"
                onClick={toggleChatbot}
                title="Close chat"
                aria-label="Close chat">
                <X size={18} />
              </button>
            </div>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex my-5 ${
                  msg.isUser ? "justify-end" : "justify-start"
                }`}>
                {!msg.isUser && (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    🤖
                  </div>
                )}
                {msg.isUser && (
                  <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center mr-2">
                    👤
                  </div>
                )}
                <div
                  className={`px-3 py-2 rounded-lg max-w-[80%] ${
                    msg.isUser
                      ? "bg-blue-500 text-white"
                      : "bg-gray-200 text-gray-700"
                  }`}>
                  {msg.text}
                </div>
                <div ref={chatEndRef}></div>
              </div>
            ))}
          </div>
          <div className="p-3 border-t flex gap-2">
            <input
              type="text"
              className="flex-1 px-3 py-2 border rounded-lg text-sm focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              type="button"
              className="bg-blue-500 text-white px-3 py-2 rounded-lg text-sm"
              onClick={sendMessage}>
              Send
            </button>
          </div>
        </div>
      )}
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600"
          title="Open chat"
          aria-label="Open chat">
          <MessageCircle size={34} />
        </button>
      )}
    </div>
  );
};

export default Chatbot;
