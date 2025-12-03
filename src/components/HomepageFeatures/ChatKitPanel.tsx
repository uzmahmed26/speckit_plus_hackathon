// src/components/HomepageFeatures/ChatKitPanel.tsx
import React, { useState, useEffect, useRef } from "react";
import clsx from "clsx";

type Props = {
  selectedText?: string | null;
  onThreadChange: (id: string | null) => void;
  onResponseCompleted: () => void;
};

type Message = {
  id: string;
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: number;
};

const API_URL = (typeof window !== 'undefined' && (window as any).BACKEND_API_URL) || 'http://localhost:8000';

export default function ChatKitPanel({ selectedText, onThreadChange, onResponseCompleted }: Props) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'assistant',
      content: 'Hello! I am your AI assistant for Physical AI & Humanoid Robotics. How can I help you today?',
      timestamp: Date.now()
    }
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  // Handle selected text
  useEffect(() => {
    if (selectedText) {
      setInputValue(`Explain this: "${selectedText}"`);
    }
  }, [selectedText]);

  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();

    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputValue,
      timestamp: Date.now()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    try {
      const response = await fetch(`${API_URL}/api/query`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: userMessage.content,
          selected_text: selectedText || null
        }),
      });

      if (!response.ok) {
        throw new Error(`Error: ${response.statusText}`);
      }

      const data = await response.json();
      // OpenAI format: choices[0].message.content
      const aiContent = data.choices?.[0]?.message?.content || "I couldn't generate a response.";

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiContent,
        timestamp: Date.now()
      };

      setMessages(prev => [...prev, aiMessage]);
      onResponseCompleted();
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        role: 'system',
        content: "Sorry, I encountered an error connecting to the server. Please ensure the backend is running.",
        timestamp: Date.now()
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="chat-interface" style={{
      display: 'flex',
      flexDirection: 'column',
      height: '100%',
      background: 'linear-gradient(135deg, #A8E0DC, #83C0C1)', /* Mint chat window background */
      color: 'var(--ifm-font-color-base)',
      borderRadius: '24px',
      overflow: 'hidden'
    }}>
      {/* Messages Area */}
      <div className="chat-messages" style={{
        flex: 1,
        overflowY: 'auto',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}>
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={clsx('message', msg.role)}
            style={{
              alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
              maxWidth: '85%',
              padding: '12px 16px',
              borderRadius: '24px',
              fontSize: '14px',
              lineHeight: '1.5',
              background: msg.role === 'user'
                ? 'linear-gradient(135deg, #F7DC88, #FFE5A0)' /* Yellow gradient bubbles */
                : msg.role === 'system'
                  ? 'linear-gradient(135deg, #E8998D, #ECB0A6)' /* Coral for system messages */
                  : '#FFFFFF', /* White cards for AI */
              color: msg.role === 'user'
                ? '#2C5F6F' /* Dark teal text for user messages */
                : msg.role === 'system'
                  ? '#FFFFFF'
                  : '#2C5F6F', /* Dark teal text for AI messages */
              border: msg.role === 'assistant' ? '2px solid #3C7A89' : 'none', /* Teal border for AI */
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
              borderBottomRightRadius: msg.role === 'user' ? '4px' : '24px',
              borderBottomLeftRadius: msg.role === 'assistant' ? '4px' : '24px',
              fontWeight: 500
            }}
          >
            {msg.content}
          </div>
        ))}
        {isLoading && (
          <div className="message assistant" style={{
            alignSelf: 'flex-start',
            background: '#FFFFFF',
            border: '2px solid #3C7A89',
            padding: '12px 16px',
            borderRadius: '24px',
            borderBottomLeftRadius: '4px',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.1)',
            color: '#2C5F6F'
          }}>
            <div className="typing-indicator">Thinking...</div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form
        onSubmit={handleSendMessage}
        style={{
          padding: '16px',
          borderTop: '2px solid rgba(255, 255, 255, 0.5)',
          display: 'flex',
          gap: '12px',
          background: 'rgba(255, 255, 255, 0.3)',
          backdropFilter: 'blur(10px)'
        }}
      >
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Ask a question..."
          disabled={isLoading}
          style={{
            flex: 1,
            padding: '12px 18px',
            borderRadius: '24px',
            border: '2px solid rgba(255, 255, 255, 0.8)',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            color: '#2C5F6F',
            outline: 'none',
            fontSize: '14px',
            fontWeight: 500,
            transition: 'all 0.3s ease'
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#F7DC88';
            e.target.style.boxShadow = '0 0 0 3px rgba(247, 220, 136, 0.3)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(255, 255, 255, 0.8)';
            e.target.style.boxShadow = 'none';
          }}
        />
        <button
          type="submit"
          disabled={isLoading || !inputValue.trim()}
          style={{
            width: '48px',
            height: '48px',
            borderRadius: '50%',
            border: 'none',
            background: 'linear-gradient(135deg, #E8998D, #ECB0A6)', /* Coral send button */
            color: '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: isLoading || !inputValue.trim() ? 'not-allowed' : 'pointer',
            opacity: isLoading || !inputValue.trim() ? 0.6 : 1,
            transition: 'all 0.3s ease',
            boxShadow: '0 4px 16px rgba(232, 153, 141, 0.3)'
          }}
          onMouseEnter={(e) => {
            if (!isLoading && inputValue.trim()) {
              e.currentTarget.style.transform = 'scale(1.1)';
              e.currentTarget.style.boxShadow = '0 6px 24px rgba(232, 153, 141, 0.5)';
            }
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.transform = 'scale(1)';
            e.currentTarget.style.boxShadow = '0 4px 16px rgba(232, 153, 141, 0.3)';
          }}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
}