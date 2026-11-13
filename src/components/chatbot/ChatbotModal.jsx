import React, { useState } from 'react';
import { MessageSquare, X, Send, Bot, User, Sparkles, HelpCircle, ArrowRight } from 'lucide-react';
import { chatbotKnowledge } from '../../data/initialData';

export default function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'bot',
      text: 'Hello! 👋 I am your Freelancer & Client Management Assistant. How can I help you today? You can pick a topic below or type your question.'
    }
  ]);
  const [inputText, setInputText] = useState('');

  const handleSelectTopic = (topicObj) => {
    // Add user question
    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: topicObj.title
    };

    // Add bot answer
    const botMsg = {
      id: 'bot-' + (Date.now() + 1),
      sender: 'bot',
      text: topicObj.content
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim()) return;

    const userText = inputText.trim();
    setInputText('');

    const userMsg = {
      id: 'user-' + Date.now(),
      sender: 'user',
      text: userText
    };

    // Look for best matching knowledge
    const match = chatbotKnowledge.find(k => 
      userText.toLowerCase().includes(k.topic.toLowerCase()) ||
      userText.toLowerCase().includes(k.title.toLowerCase()) ||
      k.content.toLowerCase().includes(userText.toLowerCase())
    );

    let reply = "I'm here to help with questions about Registration, Project Workflows, Creating Invoices, or Payment Processing. Feel free to choose one of the quick topics below!";
    if (match) {
      reply = `${match.title}\n\n${match.content}`;
    } else if (userText.toLowerCase().includes('hello') || userText.toLowerCase().includes('hi')) {
      reply = "Vanakkam! Welcome to the Freelancer Invoice & Client Management System. How can I assist you with your projects, invoices or clients today?";
    } else if (userText.toLowerCase().includes('invoice') || userText.toLowerCase().includes('bill')) {
      reply = "To create an invoice: go to the Freelancer Dashboard -> Invoices -> click 'Create Invoice'. You can add line items, taxes, discounts, and generate a printable PDF!";
    } else if (userText.toLowerCase().includes('pay') || userText.toLowerCase().includes('payment')) {
      reply = "Payments can be submitted directly by clients under their 'Make Payment' view, or recorded by freelancers under the 'Payments' module with transaction reference IDs.";
    }

    const botMsg = {
      id: 'bot-' + (Date.now() + 1),
      sender: 'bot',
      text: reply
    };

    setMessages(prev => [...prev, userMsg, botMsg]);
  };

  return (
    <>
      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(prev => !prev)}
        className="fixed bottom-6 right-6 z-40 flex items-center gap-2.5 px-4 py-3 rounded-full bg-gradient-to-r from-indigo-600 to-indigo-700 text-white shadow-lg hover:shadow-indigo-500/30 hover:scale-105 active:scale-95 transition-all duration-200 group"
        aria-label="Open support assistant"
      >
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-400"></span>
        </span>
        <Bot className="w-5 h-5 text-indigo-100 group-hover:rotate-12 transition-transform" />
        <span className="text-sm font-semibold tracking-wide hidden sm:inline">Need Help? Chat</span>
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-6 z-50 w-96 max-w-[calc(100vw-2rem)] h-[520px] bg-white rounded-2xl shadow-2xl border border-slate-200 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-200">
          {/* Header */}
          <div className="bg-gradient-to-r from-indigo-600 to-indigo-700 text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <div>
                <h4 className="text-sm font-bold flex items-center gap-1.5">
                  Assistant Bot
                  <span className="text-[10px] px-1.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 font-normal">Active</span>
                </h4>
                <p className="text-xs text-indigo-100">Flowchart Guide & Support</p>
              </div>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-lg text-white/80 hover:bg-white/10 hover:text-white transition"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Topic Chips (Module 9 Flowchart) */}
          <div className="px-3 py-2 bg-slate-50 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs whitespace-nowrap scrollbar-none">
            <span className="text-[11px] font-semibold text-slate-400 flex items-center gap-1 pl-1">
              <HelpCircle className="w-3 h-3" /> Topics:
            </span>
            {chatbotKnowledge.map((k) => (
              <button
                key={k.topic}
                onClick={() => handleSelectTopic(k)}
                className="px-2.5 py-1 rounded-full bg-white text-indigo-700 font-medium border border-indigo-100 hover:bg-indigo-50 transition shadow-2xs"
              >
                {k.topic}
              </button>
            ))}
          </div>

          {/* Messages Area */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-slate-50/40">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex gap-2.5 ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {m.sender === 'bot' && (
                  <div className="w-7 h-7 rounded-lg bg-indigo-100 text-indigo-700 flex items-center justify-center flex-shrink-0 text-xs">
                    <Bot className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-[82%] text-xs rounded-2xl px-3.5 py-2.5 leading-relaxed whitespace-pre-line shadow-2xs ${
                    m.sender === 'user'
                      ? 'bg-indigo-600 text-white rounded-br-none'
                      : 'bg-white text-slate-800 border border-slate-100 rounded-bl-none'
                  }`}
                >
                  {m.text}
                </div>

                {m.sender === 'user' && (
                  <div className="w-7 h-7 rounded-lg bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 text-xs">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <form onSubmit={handleSend} className="p-3 bg-white border-t border-slate-100 flex items-center gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask anything (e.g. invoice guide)..."
              className="flex-1 text-xs bg-slate-50 border border-slate-200 rounded-xl px-3 py-2.5 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500"
            />
            <button
              type="submit"
              disabled={!inputText.trim()}
              className="p-2.5 bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 disabled:opacity-40 disabled:cursor-not-allowed transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
