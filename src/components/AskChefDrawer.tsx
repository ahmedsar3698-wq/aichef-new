import React, { useState, useRef, useEffect } from 'react';
import { X, Send, Sparkles, ChefHat, MessageSquare, Volume2, RotateCcw } from 'lucide-react';
import { APP_IMAGES } from '../data/defaults';
import { ChefChatMessage } from '../types';

interface AskChefDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  detectedIngredients: string[];
}

export const AskChefDrawer: React.FC<AskChefDrawerProps> = ({
  isOpen,
  onClose,
  detectedIngredients,
}) => {
  if (!isOpen) return null;

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<ChefChatMessage[]>([
    {
      id: 'welcome',
      sender: 'chef',
      text: 'Khush aamdeed barkhurdaar! Main Ustad Bashir Chishti hoon. Khana pakanay, masalon ki miqdar, gosht galane ya kisi recipe ke baray mein be-jhijhak sawaal poochein. Aaj aapki kya madad karoon?',
      timestamp: 'Just now',
    },
  ]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const quickQuestions = [
    'Shinwari Karahi mein dahi kyun nahi daalte?',
    'Gosht jaldi galane ka aasan desi tareeqa?',
    'Gravy mein namak zyada ho jaye to kya karein?',
    'Tamatar ke chilkay jaldi utaarne ka tareeqa?',
  ];

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleSendQuery = async (queryText?: string) => {
    const questionToSend = queryText || inputQuery;
    if (!questionToSend.trim() || isLoading) return;

    const userMsg: ChefChatMessage = {
      id: Date.now().toString(),
      sender: 'user',
      text: questionToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/ask-chef', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: questionToSend,
          currentIngredients: detectedIngredients,
        }),
      });

      if (!response.ok) {
        throw new Error('API request failed');
      }

      const data = await response.json();
      const chefMsg: ChefChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'chef',
        text: data.answer || 'Subhanallah! Khana pakanay mein sabr aur aanch ka kheyal rakhein.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, chefMsg]);
    } catch (err) {
      // Friendly local fallback
      let fallbackText = 'Mashallah! Khana banatay waqt aanch ka kheyal rakhein. Masalon ko achhi tarah bhoonein aur pani hamesha garam istemaal karein taakay cooking cycle break na ho.';
      if (questionToSend.toLowerCase().includes('dahi')) {
        fallbackText = 'Shinwari karahi mein dahi is liye nahi daalte kyunke dahi gravy ka makhsoos namkeen aur roshan tamatari zaiqa daba deti hai. Shinwari ki jaan sirf taaza tamatar, kali mirch aur namak hai!';
      } else if (questionToSend.toLowerCase().includes('namak')) {
        fallbackText = 'Agar namak zyada ho jaye to salan mein kacha cheela hua aloo daal dein, ya phir goondha hua aata ki choti goli daal kar 5 minute dum dein. Sara izafi namak jazb ho jayega!';
      } else if (questionToSend.toLowerCase().includes('gosht') || questionToSend.toLowerCase().includes('galane')) {
        fallbackText = 'Gosht jaldi galane ke liye thora sa kacha papita (raw papaya) paste ya aadha chhota chamach baking soda lagayein. Aur agar ubaal rahe hon to 2-3 sookhi khajoor ki guthliyan ya adrak ka chilka daal dein, gosht makhan jaisa galega!';
      } else if (questionToSend.toLowerCase().includes('chilkay') || questionToSend.toLowerCase().includes('tamatar')) {
        fallbackText = 'Tamatar ko do hisson mein kaat kar garam tail mein ulta (cut-side down) rakhein aur 3 minute dhak dein. Bhaap se chilka bilkul alag ho jayega aur aap chimtay se aasaani se utaar sakte hain!';
      }

      const chefMsg: ChefChatMessage = {
        id: (Date.now() + 1).toString(),
        sender: 'chef',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, chefMsg]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSpeak = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    utterance.pitch = 0.9;
    utterance.lang = 'hi-IN';
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#121110]/80 backdrop-blur-sm flex justify-end">
      <div className="w-full max-w-lg h-full bg-[#1C1A17] border-l border-[#F59E0B]/20 flex flex-col shadow-2xl animate-slideLeft">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 border-b border-[#F59E0B]/15 bg-[#121110] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative w-12 h-12 rounded-full overflow-hidden border border-[#F59E0B]/40 bg-[#26231F] shrink-0">
              <img
                src={APP_IMAGES.logo}
                alt="Ustad Bashir Chishti"
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
              <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#10B981] border-2 border-[#121110]"></span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-serif text-lg font-bold text-[#FAF7F2]">
                  Ustad Bashir Chishti
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#C2410C] text-white font-bold">
                  Senior Chef
                </span>
              </div>
              <span className="text-xs text-[#D4C9BC]">
                Kitchen Mushawarat & Desi Nuskhe (Roman Urdu)
              </span>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-[#26231F] hover:bg-[#332E29] text-[#FAF7F2] border border-[#F59E0B]/20 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="p-3 bg-[#171614] border-b border-[#F59E0B]/10 overflow-x-auto flex items-center gap-2">
          {quickQuestions.map((q, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => handleSendQuery(q)}
              className="shrink-0 text-xs px-3 py-1.5 rounded-full bg-[#26231F] hover:bg-[#332E29] text-[#D4C9BC] hover:text-[#FAF7F2] border border-[#F59E0B]/15 transition-all"
            >
              {q}
            </button>
          ))}
        </div>

        {/* Messages Feed */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex flex-col ${
                msg.sender === 'user' ? 'items-end' : 'items-start'
              }`}
            >
              <div
                className={`max-w-[85%] rounded-2xl p-4 text-xs sm:text-sm leading-relaxed shadow-md ${
                  msg.sender === 'user'
                    ? 'bg-[#C2410C] text-white rounded-tr-none'
                    : 'bg-[#26231F] border border-[#F59E0B]/20 text-[#FAF7F2] rounded-tl-none'
                }`}
              >
                {msg.sender === 'chef' && (
                  <div className="flex items-center justify-between gap-2 mb-1.5 pb-1 border-b border-[#F59E0B]/10">
                    <span className="text-[11px] font-bold text-[#F59E0B] flex items-center gap-1">
                      <ChefHat className="w-3.5 h-3.5" />
                      Ustad Ji Ka Jawab:
                    </span>
                    <button
                      type="button"
                      onClick={() => handleSpeak(msg.text)}
                      className="text-[#D4C9BC] hover:text-[#FAF7F2] p-0.5 rounded"
                      title="Sunein"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
                <p className="whitespace-pre-wrap">{msg.text}</p>
                <span className="block text-[10px] text-right mt-1.5 opacity-60">
                  {msg.timestamp}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-start">
              <div className="bg-[#26231F] border border-[#F59E0B]/20 rounded-2xl rounded-tl-none p-4 text-xs text-[#F59E0B] flex items-center gap-2">
                <RotateCcw className="w-4 h-4 animate-spin text-[#F59E0B]" />
                <span>Ustad Ji nuskha soch rahe hain...</span>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Field */}
        <div className="p-3 sm:p-4 bg-[#121110] border-t border-[#F59E0B]/15">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendQuery();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputQuery}
              onChange={(e) => setInputQuery(e.target.value)}
              placeholder="Ustad ji se cooking ka sawaal poochein..."
              className="flex-1 px-4 py-3 rounded-xl bg-[#1C1A17] border border-[#F59E0B]/25 text-xs sm:text-sm text-[#FAF7F2] placeholder-[#D4C9BC]/50 focus:outline-none focus:border-[#C2410C]"
            />
            <button
              type="submit"
              disabled={isLoading || !inputQuery.trim()}
              className="px-4 py-3 rounded-xl bg-[#C2410C] hover:bg-[#ea580c] disabled:opacity-50 text-white font-semibold transition-all flex items-center justify-center shrink-0 shadow-md"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};
