import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, X, Send, Bot, User } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const defaultResponses: Record<string, string> = {
  default: "I'm here to help with anything related to Edu Liberty! Ask me about contributions, the prize draw, your impact, or how to get started.",
  hello: "Hello! 👋 Welcome to Edu Liberty support. How can I help you today?",
  draw: "Our Appreciation Draw happens monthly! Every R1 you contribute = 1 entry. The Grand Prize is R2,000, with additional runner-up prizes. The next draw is in 4 days!",
  contribute: "Contributing is easy! Just R1 per day (R30/month) goes directly to funding education. You can pay via the 'Pay Now' button on your dashboard.",
  impact: "Your contributions have helped fund 12,400+ students across South Africa with a 98% completion rate. Every rand makes a difference!",
  refund: "Contributions are donations and are non-refundable. However, you can pause or cancel your monthly contribution at any time from Settings.",
};

const getResponse = (input: string): string => {
  const lower = input.toLowerCase();
  if (lower.includes("hello") || lower.includes("hi")) return defaultResponses.hello;
  if (lower.includes("draw") || lower.includes("prize") || lower.includes("win")) return defaultResponses.draw;
  if (lower.includes("pay") || lower.includes("contribute") || lower.includes("donate")) return defaultResponses.contribute;
  if (lower.includes("impact") || lower.includes("student") || lower.includes("fund")) return defaultResponses.impact;
  if (lower.includes("refund") || lower.includes("cancel")) return defaultResponses.refund;
  return defaultResponses.default;
};

const ChatBot = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: "Hi! 👋 I'm the Edu Liberty assistant. How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, typing]);

  const send = () => {
    if (!input.trim()) return;
    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      setMessages((prev) => [...prev, { role: "assistant", content: getResponse(userMsg.content) }]);
      setTyping(false);
    }, 800 + Math.random() * 600);
  };

  return (
    <>
      {/* FAB */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen(!open)}
        className="fixed bottom-24 right-5 w-14 h-14 rounded-full flex items-center justify-center z-50 gold-glow"
        style={{ background: "linear-gradient(135deg, hsl(47, 91%, 52%), hsl(43, 85%, 45%))" }}
      >
        {open ? <X className="w-6 h-6" style={{ color: "hsl(220, 69%, 14%)" }} strokeWidth={1.5} /> : <MessageCircle className="w-6 h-6" style={{ color: "hsl(220, 69%, 14%)" }} strokeWidth={1.5} />}
      </motion.button>

      {/* Chat drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed bottom-40 right-5 left-5 z-40 glass-card gold-border overflow-hidden flex flex-col"
            style={{ maxHeight: "60vh" }}
          >
            {/* Header */}
            <div className="p-4 flex items-center gap-3" style={{ borderBottom: "1px solid hsl(0 0% 100% / 0.1)" }}>
              <div className="w-8 h-8 rounded-full flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
                <Bot className="w-4 h-4 gold-text" strokeWidth={1.5} />
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground font-display">Edu Liberty AI</p>
                <p className="text-[10px] text-silver">Always here to help</p>
              </div>
            </div>

            {/* Messages */}
            <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 min-h-[200px]">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-2 ${msg.role === "user" ? "justify-end" : ""}`}
                >
                  {msg.role === "assistant" && (
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
                      <Bot className="w-3 h-3 gold-text" strokeWidth={1.5} />
                    </div>
                  )}
                  <div className={`max-w-[80%] px-3 py-2 rounded-2xl text-sm ${msg.role === "user" ? "btn-gold text-xs" : "glass-card text-silver"}`}>
                    {msg.content}
                  </div>
                  {msg.role === "user" && (
                    <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "hsl(0 0% 100% / 0.1)" }}>
                      <User className="w-3 h-3 text-silver" strokeWidth={1.5} />
                    </div>
                  )}
                </motion.div>
              ))}
              {typing && (
                <div className="flex gap-2">
                  <div className="w-6 h-6 rounded-full flex-shrink-0 flex items-center justify-center" style={{ background: "hsl(47 91% 52% / 0.15)" }}>
                    <Bot className="w-3 h-3 gold-text" strokeWidth={1.5} />
                  </div>
                  <div className="glass-card px-4 py-2 rounded-2xl">
                    <span className="flex gap-1">
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(47, 91%, 52%)", animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(47, 91%, 52%)", animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ background: "hsl(47, 91%, 52%)", animationDelay: "300ms" }} />
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Input */}
            <div className="p-3 flex gap-2" style={{ borderTop: "1px solid hsl(0 0% 100% / 0.1)" }}>
              <input
                className="input-aura flex-1 text-sm py-2"
                placeholder="Ask anything..."
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
              />
              <motion.button whileTap={{ scale: 0.9 }} onClick={send} className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: "linear-gradient(135deg, hsl(47, 91%, 52%), hsl(43, 85%, 45%))" }}>
                <Send className="w-4 h-4" style={{ color: "hsl(220, 69%, 14%)" }} strokeWidth={1.5} />
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ChatBot;
