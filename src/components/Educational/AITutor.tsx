import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Bot, User, Sparkles } from 'lucide-react';
import { askTutor } from '../../services/geminiService';
import { cn } from '../../lib/utils';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const AITutor: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your Random Forest tutor. Ask me anything about how this algorithm works, bagging, or decision trees!" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setIsLoading(true);

    const response = await askTutor(userMsg);
    setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    setIsLoading(false);
  };

  return (
    <div className="flex flex-col h-[500px] bg-white border border-ink shadow-2xl relative overflow-hidden">
      <div className="p-4 border-b border-ink bg-cream-dark flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 border border-ink flex items-center justify-center bg-white rotate-6">
            <Bot className="w-4 h-4 text-ink" />
          </div>
          <div>
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] leading-none">AI Study Buddy</h3>
            <p className="text-[9px] text-muted uppercase tracking-widest mt-1">Machine Learning Series // v04</p>
          </div>
        </div>
        <Sparkles className="w-4 h-4 text-ink/20" />
      </div>

      <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-[#FCFBF9]">
        {messages.map((msg, i) => (
          <div key={i} className={cn("flex w-full", msg.role === 'user' ? "justify-end" : "justify-start")}>
            <div className={cn(
              "max-w-[85%] px-4 py-3 text-sm leading-relaxed",
              msg.role === 'user' 
                ? "bg-ink text-white" 
                : "bg-white border border-ink"
            )}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white border border-ink px-4 py-3 animate-pulse">
               <span className="text-[10px] font-bold uppercase tracking-widest italic">Analyzing features...</span>
            </div>
          </div>
        )}
      </div>

      <div className="p-4 bg-cream-dark border-t border-ink">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder="What is bagging?"
            className="flex-1 px-4 py-3 bg-white border border-ink text-xs font-bold uppercase tracking-widest focus:outline-none transition-all placeholder:text-zinc-300"
          />
          <button
            onClick={handleSend}
            disabled={isLoading}
            className="w-12 h-12 bg-ink text-white flex items-center justify-center hover:bg-zinc-800 transition-colors disabled:opacity-50"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AITutor;
