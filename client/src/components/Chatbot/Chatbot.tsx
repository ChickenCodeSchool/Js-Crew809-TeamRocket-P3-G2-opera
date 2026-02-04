import { Bot, Send, User, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./Chatbot.css";

interface Action {
  label: string;
  url: string;
}

interface Message {
  id: number;
  text: string;
  sender: "user" | "bot";
  timestamp: Date;
  action?: Action;
}

interface ResponsePattern {
  keywords: string[];
  response: string;
  action?: Action;
}

const responsePatterns: ResponsePattern[] = [
  {
    keywords: ["bonjour", "salut", "hello", "coucou", "bonsoir"],
    response:
      "Bonjour ! Bienvenue sur notre boutique en ligne. Comment puis-je vous aider aujourd'hui ?",
  },
  {
    keywords: ["livraison", "frais de port", "expédition", "délai"],
    response: "Nos délais sont de 2-5 jours.",
    action: { label: "Infos Livraison", url: "/footer" },
  },
  {
    keywords: [
      "inscription",
      "s'inscrire",
      "membre",
      "m'inscrire",
      "compte",
      "création",
    ],
    response:
      "Vous pouvez vous inscrire et commander des articles en cliquant ici",
    action: { label: "S'inscrire", url: "/auth" },
  },
  {
    keywords: [
      "commande",
      "suivi",
      "suivre",
      "tracking",
      "statut",
      "commandes",
      "suivis",
      "attente",
    ],
    response:
      "Vous pouvez suivre l'état de vos commandes en temps réel sur votre espace dédié :",
    action: { label: "Mes Commandes", url: "/orders" },
  },
  {
    keywords: [
      "retour",
      "remboursement",
      "échanger",
      "renvoyer",
      "rendre",
      "aime pas",
    ],
    response:
      "Vous avez 30 jours pour changer d'avis. Retrouvez la procédure complète ici :",
    action: { label: "Politique de retour", url: "/footer" },
  },
  {
    keywords: [
      "contact",
      "contacter",
      "service client",
      "aide",
      "appel",
      "appeler",
      "écrire",
    ],
    response: "Notre équipe est à votre écoute du lundi au vendredi :",
    action: { label: "Nous contacter", url: "/nouscontacter" },
  },
  {
    keywords: ["panier", "acheter", "achat", "valider", "paiement"],
    response: "Prêt à valider vos achats ?",
    action: { label: "Voir mon panier", url: "/panier" },
  },
  {
    keywords: ["merci", "super", "parfait"],
    response:
      "Avec plaisir ! N'hésitez pas si vous avez d'autres questions. 😊",
  },
];

const defaultResponse =
  "Je n'ai pas bien compris. Essayez de me demander des infos sur la livraison, vos commandes ou comment nous contacter.";

const findResponse = (input: string): ResponsePattern | null => {
  const normalizedInput = input.toLowerCase().trim();
  return (
    responsePatterns.find((pattern) =>
      pattern.keywords.some((keyword) => normalizedInput.includes(keyword)),
    ) || null
  );
};

export default function Chatbot() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Bonjour ! Je suis votre assistant. Comment puis-je vous aider ?",
      sender: "bot",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Correction Biome : Utilisation de useCallback pour stabiliser la fonction
  const scrollToBottom = useCallback(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Correction Biome : scrollToBottom est stable, donc pas besoin d'autres dépendances
  useEffect(() => {
    scrollToBottom();
  }, [scrollToBottom]);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now(),
      text: input,
      sender: "user",
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    setTimeout(() => {
      const pattern = findResponse(input);
      const botResponse: Message = {
        id: Date.now() + 1,
        text: pattern ? pattern.response : defaultResponse,
        sender: "bot",
        timestamp: new Date(),
        action: pattern?.action,
      };

      setMessages((prev) => [...prev, botResponse]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <div className="chatbot-container">
      {!isOpen && (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="chatbot-button"
        >
          <Bot size={28} />
          <span className="chatbot-button-text">Besoin d'aide ?</span>
        </button>
      )}

      {isOpen && (
        <div className="chatbot-widget">
          <div className="chatbot-header">
            <div className="chatbot-header-content">
              <div className="chatbot-header-icon">
                <Bot size={20} />
              </div>
              <div>
                <h1 className="chatbot-header-title">Assistant Shopping</h1>
                <p className="chatbot-header-status">En ligne</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="chatbot-close-button"
            >
              <X size={20} />
            </button>
          </div>

          <div className="chatbot-messages">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`message-wrapper ${
                  message.sender === "user" ? "message-wrapper-user" : ""
                }`}
              >
                <div
                  className={`message-avatar ${
                    message.sender === "user"
                      ? "message-avatar-user"
                      : "message-avatar-bot"
                  }`}
                >
                  {message.sender === "user" ? (
                    <User size={20} />
                  ) : (
                    <Bot size={20} />
                  )}
                </div>
                <div
                  className={`message-content ${
                    message.sender === "user"
                      ? "message-content-user"
                      : "message-content-bot"
                  }`}
                >
                  <div
                    className={`message-bubble ${
                      message.sender === "user"
                        ? "message-bubble-user"
                        : "message-bubble-bot"
                    }`}
                  >
                    <p className="message-text">{message.text}</p>
                    {message.action && (
                      <Link
                        to={message.action.url}
                        className="chatbot-action-link"
                        onClick={() => setIsOpen(false)}
                      >
                        {message.action.label}
                      </Link>
                    )}
                  </div>
                  <span className="message-timestamp">
                    {message.timestamp.toLocaleTimeString("fr-FR", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="message-wrapper">
                <div className="message-avatar message-avatar-bot">
                  <Bot size={20} />
                </div>
                <div className="message-bubble message-bubble-bot">
                  <div className="typing-indicator">
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                    <span className="typing-dot" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="chatbot-input-area">
            <div className="chatbot-input-container">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleSend()}
                placeholder="Posez votre question..."
                className="chatbot-input"
              />
              <button
                type="button"
                onClick={handleSend}
                disabled={!input.trim()}
                className="chatbot-send-button"
              >
                <Send size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
