import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from "@google/genai";
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatbotSection() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm your CampusAI assistant. How can I help you with your studies today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      // Check for keywords first for quick responses as requested
      const lowerInput = userMessage.toLowerCase();
      let quickResponse = '';

      if (lowerInput.includes('exam')) {
        quickResponse = "The mid-term exams are scheduled to start from Oct 25. You can check the detailed schedule in the 'Notices' section.";
      } else if (lowerInput.includes('assignment')) {
        quickResponse = "You have 3 pending assignments. The nearest deadline is 'Graph Algorithms' due tomorrow.";
      } else if (lowerInput.includes('notes')) {
        quickResponse = "You can find all your study materials in the 'Notes' section. Which subject are you looking for?";
      } else if (lowerInput.includes('fees')) {
        quickResponse = "Your current balance is ₹0.00. The next payment for Semester 6 is due on Jan 15, 2024.";
      } else if (lowerInput.includes('scholarship')) {
        quickResponse = "The 'Merit-cum-Means' scholarship application is currently open. Check the 'Scholarship' updates on your home dashboard.";
      }

      if (quickResponse) {
        // Simulate a small delay for "thinking"
        await new Promise(resolve => setTimeout(resolve, 800));
        setMessages(prev => [...prev, { role: 'assistant', content: quickResponse }]);
      } else {
        // Use Gemini for other queries
        const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
        const response = await ai.models.generateContent({
          model: "gemini-3-flash-preview",
          contents: userMessage,
          config: {
            systemInstruction: "You are CampusAI, a helpful student assistant for a college app. You help students with their studies, campus life, and general queries. Keep your responses concise, friendly, and student-focused. Use emojis occasionally."
          }
        });
        
        const aiResponse = response.text || "I'm sorry, I couldn't process that. Could you try again?";
        setMessages(prev => [...prev, { role: 'assistant', content: aiResponse }]);
      }
    } catch (error) {
      console.error("Chatbot Error:", error);
      setMessages(prev => [...prev, { role: 'assistant', content: "Oops! Something went wrong. Please try again later." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-[calc(100vh-8rem)] md:h-[calc(100vh-4rem)] bg-background">
      <div className="p-4 border-b flex items-center gap-3 bg-primary/5">
        <div className="h-10 w-10 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg shadow-primary/20">
          <Bot className="h-6 w-6" />
        </div>
        <div>
          <h3 className="font-bold text-sm flex items-center gap-2">
            CampusAI Assistant <Sparkles className="h-3 w-3 text-yellow-500 fill-yellow-500" />
          </h3>
          <p className="text-[10px] text-muted-foreground">Online | Powered by Gemini</p>
        </div>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
              animate={{ opacity: 1, x: 0 }}
              className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-2 max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                <Avatar className="h-8 w-8 shrink-0">
                  {msg.role === 'assistant' ? (
                    <div className="bg-primary h-full w-full flex items-center justify-center">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  ) : (
                    <>
                      <AvatarImage src="https://picsum.photos/seed/student/200" />
                      <AvatarFallback>JD</AvatarFallback>
                    </>
                  )}
                </Avatar>
                <div className={`p-3 rounded-2xl text-sm shadow-sm ${
                  msg.role === 'user' 
                    ? 'bg-primary text-primary-foreground rounded-tr-none' 
                    : 'bg-accent text-accent-foreground rounded-tl-none'
                }`}>
                  {msg.content}
                </div>
              </div>
            </motion.div>
          ))}
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex gap-2 max-w-[85%]">
                <Avatar className="h-8 w-8 shrink-0">
                  <div className="bg-primary h-full w-full flex items-center justify-center">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                </Avatar>
                <div className="bg-accent p-3 rounded-2xl rounded-tl-none flex items-center gap-2">
                  <Loader2 className="h-4 w-4 animate-spin text-primary" />
                  <span className="text-xs text-muted-foreground italic">CampusAI is thinking...</span>
                </div>
              </div>
            </div>
          )}
          <div ref={scrollRef} />
        </div>
      </ScrollArea>

      <div className="p-4 border-t bg-background">
        <form 
          onSubmit={(e) => { e.preventDefault(); handleSend(); }}
          className="flex gap-2"
        >
          <Input 
            placeholder="Ask me about exams, notes, fees..." 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={isLoading}
            className="flex-1 rounded-full px-4"
          />
          <Button 
            type="submit" 
            size="icon" 
            disabled={isLoading || !input.trim()}
            className="rounded-full h-10 w-10 shrink-0"
          >
            <Send className="h-5 w-5" />
          </Button>
        </form>
      </div>
    </div>
  );
}
