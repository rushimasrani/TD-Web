import React, { useState, useEffect, useRef } from 'react';
import { MessageSquare, X, Send, Shield, User, Headphones, Loader2, Power, Mail, CheckCircle2, AlertCircle } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { useLocation } from 'react-router-dom';
import { SmartCaptcha } from '../components/SmartCaptcha';
import { SERVICES, COMPANY_NAME, COMPANY_PHONE, COMPANY_EMAIL } from '../constants';

// Initialize Gemini Client
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'ai' | 'agent' | 'system';
  timestamp: Date;
}

type ChatState = 'AI_CHAT' | 'AWAITING_EMAIL' | 'VERIFYING_HUMAN' | 'HANDOVER_PENDING' | 'LIVE_AGENT';

const ChatWidget: React.FC = () => {
  const location = useLocation();
  
  // -- State --
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [chatState, setChatState] = useState<ChatState>('AI_CHAT');
  const [clientEmail, setClientEmail] = useState('');
  const [sessionId] = useState(() => Math.random().toString(36).substring(7));
  
  // Admin / View State
  const [isAdminView, setIsAdminView] = useState(false);
  
  // Messages
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init-1',
      text: "Hello! I'm your TechDefends security assistant. How can I help secure your infrastructure today?",
      sender: 'ai',
      timestamp: new Date()
    }
  ]);

  const chatEndRef = useRef<HTMLDivElement>(null);
  const chatSessionRef = useRef<Chat | null>(null);

  // -- Initialization & Admin Check --
  useEffect(() => {
    // Check URL for Admin Takeover link (e.g., ?admin_session=true)
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin_session') === 'true') {
      setIsAdminView(true);
      setIsOpen(true);
      setChatState('LIVE_AGENT');
      setMessages([{
        id: 'admin-welcome',
        text: `🔴 SYSTEM: You have joined Chat Session #${sessionId} as an Administrator.`,
        sender: 'system',
        timestamp: new Date()
      }]);
    }
  }, []);

  // -- Auto Scroll --
  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen, isTyping, chatState]);

  // -- Initialize AI --
  useEffect(() => {
    if (!process.env.API_KEY || chatSessionRef.current) return;

    const initChat = async () => {
      const servicesContext = SERVICES.map(s => 
        `- ${s.title}: ${s.shortDescription}. (ID: ${s.id})`
      ).join('\n');

      const systemInstruction = `
        You are the Tier 1 Cybersecurity Support Agent for ${COMPANY_NAME}.
        
        YOUR KNOWLEDGE BASE:
        ${servicesContext}
        Contact Info: ${COMPANY_PHONE}, ${COMPANY_EMAIL}.
        
        RULES:
        1. Keep answers concise (under 3 sentences) unless asked for details.
        2. Be professional, reassuring, and security-conscious.
        3. You are currently on the "${location.pathname}" page.
        4. CRITICAL: If the user asks to speak to a human, asks for a custom quote, or seems frustrated, you MUST reply with exactly: "CONNECT_TO_AGENT" and nothing else.
      `;

      try {
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: { systemInstruction, temperature: 0.7 },
        });
      } catch (error) {
        console.error("Failed to init chat", error);
      }
    };
    initChat();
  }, [location.pathname]);

  // -- Notification Logic --
  const sendAdminNotification = async (email: string) => {
    // Use AJAX endpoint for background submission
    const endpoint = `https://formsubmit.co/ajax/${COMPANY_EMAIL}`;
    console.log("Attempting to send notification to:", endpoint);
    
    try {
      // Construct the secure takeover link
      const takeoverLink = `${window.location.origin}${window.location.pathname}?admin_session=true&room=${sessionId}`;

      const response = await fetch(endpoint, {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          _subject: `🚨 LIVE CHAT: New Request from ${email}`, 
          _template: "box",
          _replyto: email,
          _captcha: "false", // We handled Captcha on client side
          
          // Email Body Data
          "Notification Type": "Live Chat Request",
          "Client Email": email,
          "Session ID": sessionId,
          "Page Context": location.pathname,
          "Timestamp": new Date().toLocaleString(),
          "Security Check": "Passed",
          "ACTION REQUIRED": "Click the link below to join the chat session immediately.",
          "Admin Link": takeoverLink
        })
      });

      if (response.ok) {
        console.log("✅ Notification Sent Successfully");
      } else {
        const errorText = await response.text();
        console.error("❌ Failed to send notification. Status:", response.status, errorText);
      }
    } catch (e) {
      console.error("❌ Network error sending notification:", e);
    }
  };

  // -- Main Handler --
  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    // 1. Add User Message
    const userMsg: ChatMessage = {
      id: Date.now().toString(),
      text: input,
      sender: isAdminView ? 'agent' : 'user',
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');

    // If Admin, just post message and stop (simulating websocket broadcast)
    if (isAdminView) return;

    // 2. Handle specific Chat States
    if (chatState === 'AWAITING_EMAIL') {
      handleEmailCapture(userMsg.text);
      return;
    }

    if (chatState === 'LIVE_AGENT' || chatState === 'HANDOVER_PENDING' || chatState === 'VERIFYING_HUMAN') {
      // Waiting states
      return;
    }

    // 3. AI Logic (Standard Chat)
    setIsTyping(true);
    try {
      if (!chatSessionRef.current) throw new Error("AI Session not initialized");

      const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ message: userMsg.text });
      const responseText = result.text.trim();

      // Check for Handover Signal
      if (responseText.includes("CONNECT_TO_AGENT")) {
        setChatState('AWAITING_EMAIL');
        setIsTyping(false);
        setMessages(prev => [...prev, {
          id: Date.now().toString(),
          text: "I can certainly connect you with a security specialist. To ensure we don't get disconnected, please provide your email address.",
          sender: 'ai',
          timestamp: new Date()
        }]);
        return;
      }

      // Normal Response
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        text: responseText,
        sender: 'ai',
        timestamp: new Date()
      }]);

    } catch (error) {
      console.error("AI Error:", error);
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "I'm having trouble connecting to the security mainframe.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    } finally {
      setIsTyping(false);
    }
  };

  // -- Email Validation & Handover --
  const handleEmailCapture = (emailText: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (emailRegex.test(emailText)) {
      setClientEmail(emailText);
      setChatState('VERIFYING_HUMAN');
      
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "One last step: Please complete the security check below to verify you are not a robot.",
        sender: 'system',
        timestamp: new Date()
      }]);

    } else {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        text: "That doesn't look like a valid email address. Please try again so we can connect you.",
        sender: 'ai',
        timestamp: new Date()
      }]);
    }
  };

  // -- Captcha Handler --
  const handleCaptchaVerify = (token: string | null) => {
    if (token) {
        setChatState('HANDOVER_PENDING');
        
        setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "Verification successful. Notifying our technical team now...",
            sender: 'system',
            timestamp: new Date()
        }]);

        // Trigger Notification
        sendAdminNotification(clientEmail).then(() => {
            setMessages(prev => [...prev, {
            id: Date.now().toString(),
            text: "Alert sent! An agent has been notified via secure channel. Please stay on this page, someone will join momentarily.",
            sender: 'ai',
            timestamp: new Date()
            }]);
        });

        // Simulation: Auto-join agent after 8 seconds for demo purposes
        setTimeout(() => {
            setChatState('LIVE_AGENT');
            setMessages(prev => [...prev, {
            id: 'agent-join',
            text: "Agent Sarah has joined the chat.",
            sender: 'system',
            timestamp: new Date()
            }, {
            id: 'agent-msg-1',
            text: `Hi there! I see you're looking for help. I have your email (${clientEmail}). How can I assist?`,
            sender: 'agent',
            timestamp: new Date()
            }]);
        }, 8000);
    }
  };

  // Toggle Admin Mode (Simulation)
  const toggleAdminMode = () => setIsAdminView(!isAdminView);

  return (
    <>
      {/* Launcher Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 z-50 p-4 rounded-full shadow-2xl transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500 ${
            isOpen ? 'bg-slate-800 rotate-90' : 'bg-brand-600 hover:bg-brand-700'
        } text-white`}
        aria-label={isOpen ? "Close chat" : "Open live chat"}
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        {chatState === 'LIVE_AGENT' && !isOpen && (
           <span className="absolute top-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full"></span>
        )}
      </button>

      {/* Chat Window */}
      <div 
        className={`fixed bottom-24 right-6 w-[90vw] sm:w-96 bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden transition-all duration-300 origin-bottom-right z-50 flex flex-col ${
            isOpen ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-10 pointer-events-none'
        }`}
        style={{ maxHeight: 'min(600px, 80vh)' }}
      >
        {/* Header */}
        <div className={`p-4 text-white flex justify-between items-center shadow-md transition-colors ${
            isAdminView ? 'bg-slate-900' : (chatState === 'LIVE_AGENT' ? 'bg-blue-600' : 'bg-brand-600')
        }`}>
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                {isAdminView || chatState === 'LIVE_AGENT' ? <Headphones size={20} /> : <Shield size={20} />}
              </div>
              <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-brand-600 ${
                  chatState === 'LIVE_AGENT' ? 'bg-green-400' : 'bg-green-400'
              }`}></div>
            </div>
            <div>
              <h3 className="font-bold text-sm">
                {isAdminView ? 'Admin Console' : (chatState === 'LIVE_AGENT' ? 'Live Support' : 'TechDefends AI')}
              </h3>
              <p className="text-xs opacity-80">
                {isAdminView ? `Session: ${sessionId}` : (chatState === 'LIVE_AGENT' ? 'Human Agent Connected' : 'Automated Secure Line')}
              </p>
            </div>
          </div>
          
          <button onClick={toggleAdminMode} className="text-white/20 hover:text-white transition-colors" title="Toggle Admin View">
            <Power size={14} />
          </button>
        </div>

        {/* Chat Body */}
        <div className={`flex-1 p-4 overflow-y-auto flex flex-col gap-4 bg-slate-50 ${isAdminView ? 'border-4 border-yellow-400/30' : ''}`}>
          
          {/* Email Capture Banner */}
          {chatState === 'AWAITING_EMAIL' && !isAdminView && (
             <div className="bg-blue-50 border border-blue-200 p-3 rounded-lg flex items-start gap-3 animate-fade-in">
                <Mail className="text-blue-500 shrink-0 mt-1" size={16} />
                <div>
                   <p className="text-xs text-blue-800 font-semibold">Contact Info Required</p>
                   <p className="text-xs text-blue-600">Please enter your email to connect with a human agent.</p>
                </div>
             </div>
          )}

          {/* Messages Loop */}
          {messages.map((msg) => (
            <div 
              key={msg.id} 
              className={`flex items-end gap-2 max-w-[85%] ${
                  msg.sender === 'user' ? 'self-end flex-row-reverse' : 'self-start'
              } ${msg.sender === 'system' ? 'self-center max-w-full !flex-row' : ''}`}
            >
              {msg.sender !== 'system' && (
                <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center text-xs ${
                    msg.sender === 'user' ? 'bg-slate-200 text-slate-600' : 
                    msg.sender === 'agent' ? 'bg-blue-100 text-blue-600' : 'bg-brand-100 text-brand-600'
                }`}>
                  {msg.sender === 'user' ? <User size={14} /> : msg.sender === 'agent' ? <Headphones size={14} /> : <Shield size={14} />}
                </div>
              )}

              {msg.sender === 'system' ? (
                 <div className="flex items-center gap-2 text-xs text-slate-400 my-2 w-full justify-center">
                    <span className="h-px bg-slate-200 flex-1"></span>
                    <span>{msg.text}</span>
                    <span className="h-px bg-slate-200 flex-1"></span>
                 </div>
              ) : (
                <div 
                  className={`p-3 rounded-2xl text-sm leading-relaxed shadow-sm ${
                    msg.sender === 'user' 
                      ? 'bg-brand-600 text-white rounded-tr-none' 
                      : msg.sender === 'agent'
                      ? 'bg-white border-2 border-blue-100 text-slate-700 rounded-tl-none'
                      : 'bg-white text-slate-700 border border-slate-100 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                  <div className={`text-[10px] mt-1 opacity-70 ${
                      msg.sender === 'user' ? 'text-white/80 text-right' : 'text-slate-400'
                  }`}>
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </div>
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="self-start flex items-center gap-2 text-slate-400 text-xs ml-10">
               <Loader2 size={12} className="animate-spin" /> Analyzing...
            </div>
          )}
          
          <div ref={chatEndRef} />
        </div>

        {/* Admin Banner */}
        {isAdminView && (
            <div className="bg-slate-800 text-white p-2 text-xs flex justify-between items-center">
                <span className="font-bold text-yellow-400">ADMIN MODE ACTIVE</span>
                <span className="text-slate-400">Client: {clientEmail || 'Unknown'}</span>
            </div>
        )}

        {/* Input Area / Captcha */}
        {chatState === 'VERIFYING_HUMAN' && !isAdminView ? (
            <div className="p-4 bg-slate-50 border-t border-slate-100 flex flex-col items-center justify-center animate-fade-in-up">
                <p className="text-xs text-slate-500 mb-2 font-semibold">Security Verification</p>
                <div className="w-full">
                    <SmartCaptcha
                        onVerify={handleCaptchaVerify}
                        size="compact"
                    />
                </div>
            </div>
        ) : (
            <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex gap-2">
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={
                    chatState === 'AWAITING_EMAIL' ? "Enter your email..." :
                    isAdminView ? "Reply to customer..." : "Type your message..."
                }
                disabled={chatState === 'HANDOVER_PENDING'}
                className={`flex-1 border rounded-lg px-3 py-2 text-sm focus:outline-none transition-colors ${
                    chatState === 'AWAITING_EMAIL' ? 'border-blue-300 bg-blue-50 focus:border-blue-500' : 'bg-slate-50 border-slate-200 focus:border-brand-500'
                }`}
            />
            <button 
                type="submit" 
                disabled={!input.trim() || chatState === 'HANDOVER_PENDING'}
                className={`${isAdminView ? 'bg-slate-900' : 'bg-brand-600'} text-white p-2 rounded-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors`}
            >
                <Send size={16} />
            </button>
            </form>
        )}
      </div>
    </>
  );
};

export default ChatWidget;