import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
    Sparkles, 
    MessageSquare, 
    X, 
    Send, 
    Bot, 
    RotateCcw, 
    ArrowRight, 
    ChevronDown, 
    Headphones,
    CheckCircle2,
    Shield,
    ExternalLink
} from 'lucide-react';
import { useLanguage } from '@/Context/LanguageContext';
import AiMarkdownMessage from './AiMarkdownMessage';

export default function AiChatWidget({ onOpenContact }) {
    const { lang } = useLanguage();
    const [isOpen, setIsOpen] = useState(false);
    const [hasOpenedBefore, setHasOpenedBefore] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: lang === 'ID'
                ? 'Halo! Saya **Asisten KyySolutions** 🤖.\n\nAda yang bisa saya bantu terkait produk digital, source code siap pakai, atau konsultasi pembuatan aplikasi custom hari ini?'
                : 'Hello! I am **KyySolutions Assistant** 🤖.\n\nHow can I help you with our digital products, ready-to-deploy source code, or custom app development inquiries today?',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        }
    ]);

    const messagesEndRef = useRef(null);
    const inputRef = useRef(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        if (isOpen) {
            scrollToBottom();
            setTimeout(() => inputRef.current?.focus(), 150);
        }
    }, [isOpen, messages, isLoading]);

    const handleToggle = () => {
        setIsOpen(prev => !prev);
        if (!hasOpenedBefore) setHasOpenedBefore(true);
    };

    const handleClearChat = () => {
        setMessages([
            {
                role: 'assistant',
                content: lang === 'ID'
                    ? 'Halo! Percakapan telah direset. Silakan tanyakan hal baru seputar produk atau layanan KyySolutions! 😊'
                    : 'Hello! Conversation has been reset. Feel free to ask anything about KyySolutions products or services! 😊',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
            }
        ]);
    };

    const handleSendMessage = async (textToSend) => {
        const query = (textToSend || inputMessage).trim();
        if (!query || isLoading) return;

        const userMsg = {
            role: 'user',
            content: query,
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        };

        const updatedMessages = [...messages, userMsg];
        setMessages(updatedMessages);
        setInputMessage('');
        setIsLoading(true);

        try {
            const res = await fetch('/api/ai/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify({
                    messages: updatedMessages.map(m => ({
                        role: m.role,
                        content: m.content,
                    })),
                }),
            });

            const data = await res.json();

            if (data.status === 'success' && data.reply) {
                setMessages(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: data.reply,
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }
                ]);
            } else {
                setMessages(prev => [
                    ...prev,
                    {
                        role: 'assistant',
                        content: data.reply || (lang === 'ID' 
                            ? 'Maaf, Asisten AI sedang mengalami sedikit kendala. Silakan coba sesaat lagi.' 
                            : 'Sorry, the AI Assistant is experiencing a brief hiccup. Please try again shortly.'),
                        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                    }
                ]);
            }
        } catch (error) {
            setMessages(prev => [
                ...prev,
                {
                    role: 'assistant',
                    content: lang === 'ID'
                        ? 'Koneksi ke server AI terputus. Silakan periksa koneksi internet Anda atau hubungi WhatsApp kami.'
                        : 'Connection to AI server lost. Please check your connection or contact our official WhatsApp.',
                    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
                }
            ]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const quickPrompts = [
        { label: lang === 'ID' ? '📦 Produk Terpopuler' : '📦 Top Products', query: lang === 'ID' ? 'Apa saja produk digital dan source code terpopuler di KyySolutions?' : 'What are the top digital products at KyySolutions?' },
        { label: lang === 'ID' ? '💻 Jasa Custom Web & App' : '💻 Custom Dev Services', query: lang === 'ID' ? 'Bagaimana cara memesan jasa pembuatan website atau aplikasi custom?' : 'How can I order custom web or mobile development?' },
        { label: lang === 'ID' ? '💳 Cara Pembayaran & Midtrans' : '💳 Payment Methods', query: lang === 'ID' ? 'Metode pembayaran apa saja yang didukung dan apakah delivery instan?' : 'What payment methods are supported and is delivery instant?' },
        { label: lang === 'ID' ? '🔑 Lisensi & File yang Didapat' : '🔑 License & Files', query: lang === 'ID' ? 'File apa saja yang didapat setelah beli dan bagaimana lisensinya?' : 'What files do I get after purchase and what is the license?' },
    ];

    return (
        <>
            {/* Floating Trigger Button */}
            <div className="fixed bottom-6 right-6 z-40 flex items-center">
                {!isOpen && !hasOpenedBefore && (
                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 1 }}
                        className="hidden sm:flex items-center space-x-2 mr-3 px-3.5 py-2 rounded-2xl bg-white shadow-xl border border-slate-200 text-xs font-bold text-slate-800 pointer-events-none"
                    >
                        <span className="flex h-2 w-2 relative">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                        </span>
                        <span>{lang === 'ID' ? 'Ada pertanyaan? Tanya AI Asisten' : 'Need help? Ask AI Assistant'}</span>
                    </motion.div>
                )}

                <motion.button
                    whileHover={{ scale: 1.08 }}
                    whileTap={{ scale: 0.92 }}
                    onClick={handleToggle}
                    aria-label="Open AI Assistant"
                    className="relative w-14 h-14 rounded-2xl bg-gradient-to-tr from-[#2563EB] via-[#4F46E5] to-[#7C3AED] text-white shadow-xl shadow-blue-600/35 flex items-center justify-center cursor-pointer border border-white/30 overflow-hidden group p-1.5"
                >
                    {/* Ambient Glow */}
                    <div className="absolute inset-0 bg-white/20 opacity-0 group-hover:opacity-100 transition-opacity" />

                    <AnimatePresence mode="wait">
                        {isOpen ? (
                            <motion.div
                                key="close-icon"
                                initial={{ rotate: -90, opacity: 0 }}
                                animate={{ rotate: 0, opacity: 1 }}
                                exit={{ rotate: 90, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                            >
                                <X className="w-6 h-6 text-white" />
                            </motion.div>
                        ) : (
                            <motion.div
                                key="chat-icon"
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0, opacity: 0 }}
                                transition={{ duration: 0.15 }}
                                className="relative w-full h-full flex items-center justify-center"
                            >
                                <img 
                                    src="/images/icon/ai_widget.png" 
                                    alt="Asisten KyySolutions" 
                                    className="w-10 h-10 object-contain drop-shadow-md group-hover:scale-110 transition-transform duration-200" 
                                />
                                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-emerald-400 ring-2 ring-white shadow-xs" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </motion.button>
            </div>

            {/* AI Chat Drawer / Window Modal */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, y: 30, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        transition={{ duration: 0.22 }}
                        className="fixed bottom-24 right-4 sm:right-6 z-40 w-[calc(100vw-32px)] sm:w-[410px] h-[580px] max-h-[82vh] bg-white rounded-3xl shadow-2xl border border-slate-200/90 flex flex-col overflow-hidden"
                    >
                        {/* 1. Header */}
                        <div className="px-5 py-4 bg-gradient-to-r from-[#0F172A] via-[#1E293B] to-[#0F172A] text-white flex items-center justify-between shrink-0 shadow-md">
                            <div className="flex items-center space-x-3">
                                <div className="relative">
                                    <div className="w-10 h-10 rounded-2xl bg-white/10 text-white flex items-center justify-center shadow-inner border border-white/20 p-1">
                                        <img 
                                            src="/images/icon/ai_widget.png" 
                                            alt="Asisten KyySolutions" 
                                            className="w-8 h-8 object-contain drop-shadow-xs" 
                                        />
                                    </div>
                                    <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-slate-900" />
                                </div>
                                <div>
                                    <div className="flex items-center space-x-1.5">
                                        <h3 className="font-extrabold text-sm text-white tracking-tight">Asisten KyySolutions</h3>
                                        <span className="text-[9px] font-extrabold uppercase px-1.5 py-0.5 rounded bg-blue-500/30 text-blue-300 border border-blue-400/20">AI BOT</span>
                                    </div>
                                    <p className="text-[11px] text-slate-300 flex items-center space-x-1 mt-0.5">
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                                        <span>{lang === 'ID' ? 'Online & Siap Membantu 24/7' : 'Online & Ready 24/7'}</span>
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center space-x-1">
                                <button
                                    onClick={handleClearChat}
                                    title={lang === 'ID' ? 'Reset Percakapan' : 'Reset Chat'}
                                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <RotateCcw className="w-3.5 h-3.5" />
                                </button>
                                <button
                                    onClick={handleToggle}
                                    className="w-8 h-8 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        {/* 2. Messages Scroll Container */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-3.5 bg-[#F8FAFC]/90 text-xs">
                            {messages.map((msg, idx) => {
                                const isUser = msg.role === 'user';
                                return (
                                    <motion.div
                                        key={idx}
                                        initial={{ opacity: 0, y: 8 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}
                                    >
                                        <div className={`flex items-start space-x-2 max-w-[88%] ${isUser ? 'flex-row-reverse space-x-reverse' : 'flex-row'}`}>
                                            {!isUser && (
                                                <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 shadow-2xs mt-0.5 p-0.5 overflow-hidden">
                                                    <img 
                                                        src="/images/icon/ai_widget.png" 
                                                        alt="AI" 
                                                        className="w-5 h-5 object-contain" 
                                                    />
                                                </div>
                                            )}

                                            <div className="flex-1">
                                                <div
                                                    className={`p-3.5 rounded-2xl leading-relaxed shadow-2xs ${
                                                        isUser
                                                            ? 'bg-gradient-to-tr from-[#2563EB] to-[#1D4ED8] text-white rounded-tr-xs font-medium'
                                                            : 'bg-white text-slate-800 border border-slate-200/80 rounded-tl-xs'
                                                    }`}
                                                >
                                                    <AiMarkdownMessage content={msg.content} isUser={isUser} />
                                                </div>
                                                <span className={`text-[10px] text-slate-400 block mt-1 ${isUser ? 'text-right' : 'text-left'}`}>
                                                    {msg.time}
                                                </span>
                                            </div>
                                        </div>
                                    </motion.div>
                                );
                            })}

                            {/* Typing Indicator */}
                            {isLoading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 5 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex items-center space-x-2 text-slate-400"
                                >
                                    <div className="w-7 h-7 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 p-0.5 overflow-hidden">
                                        <img 
                                            src="/images/icon/ai_widget.png" 
                                            alt="AI" 
                                            className="w-5 h-5 object-contain" 
                                        />
                                    </div>
                                    <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-tl-xs flex items-center space-x-1.5 shadow-2xs">
                                        <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-bounce" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-600 animate-bounce [animation-delay:0.2s]" />
                                        <span className="w-1.5 h-1.5 rounded-full bg-purple-600 animate-bounce [animation-delay:0.4s]" />
                                    </div>
                                </motion.div>
                            )}

                            {/* Quick Suggestion Chips (Shows on fresh/short chat) */}
                            {messages.length <= 2 && !isLoading && (
                                <div className="pt-2 space-y-1.5">
                                    <div className="text-[10px] font-bold uppercase tracking-wider text-slate-400 px-1">
                                        {lang === 'ID' ? 'Pertanyaan Populer:' : 'Quick Questions:'}
                                    </div>
                                    <div className="flex flex-col gap-1.5">
                                        {quickPrompts.map((qp, qIdx) => (
                                            <button
                                                key={qIdx}
                                                onClick={() => handleSendMessage(qp.query)}
                                                className="text-left px-3 py-2 rounded-xl bg-white hover:bg-blue-50 border border-slate-200 hover:border-blue-300 text-[11px] font-semibold text-slate-700 hover:text-blue-700 transition-all shadow-2xs flex items-center justify-between group cursor-pointer"
                                            >
                                                <span>{qp.label}</span>
                                                <ArrowRight className="w-3 h-3 text-slate-300 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}

                            <div ref={messagesEndRef} />
                        </div>

                        {/* 3. Human Support Fast Link Bar */}
                        <div className="px-4 py-2 bg-slate-100/80 border-t border-slate-200/80 flex items-center justify-between text-[11px] text-slate-600">
                            <span className="flex items-center text-slate-500">
                                <Headphones className="w-3.5 h-3.5 mr-1 text-[#2563EB]" />
                                {lang === 'ID' ? 'Butuh Tim Ahli?' : 'Need Expert Help?'}
                            </span>
                            <button
                                onClick={() => {
                                    setIsOpen(false);
                                    if (onOpenContact) onOpenContact();
                                }}
                                className="font-bold text-[#2563EB] hover:underline flex items-center space-x-1 cursor-pointer"
                            >
                                <span>{lang === 'ID' ? 'Buka Form Konsultasi' : 'Open Consultation Form'}</span>
                                <ExternalLink className="w-3 h-3" />
                            </button>
                        </div>

                        {/* 4. Input Footer */}
                        <form onSubmit={(e) => { e.preventDefault(); handleSendMessage(); }} className="p-3 bg-white border-t border-slate-200 flex items-center space-x-2">
                            <input
                                ref={inputRef}
                                type="text"
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                                onKeyDown={handleKeyDown}
                                placeholder={lang === 'ID' ? 'Tulis pesan ke Asisten KyySolutions...' : 'Ask KyySolutions Assistant...'}
                                disabled={isLoading}
                                className="flex-1 h-11 px-3.5 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-[#2563EB] focus:ring-2 focus:ring-blue-100 transition-all text-slate-800 disabled:opacity-60"
                            />
                            <button
                                type="submit"
                                disabled={!inputMessage.trim() || isLoading}
                                className="w-11 h-11 rounded-xl bg-gradient-to-tr from-[#2563EB] to-[#1D4ED8] hover:from-[#1D4ED8] hover:to-[#2563EB] text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shrink-0"
                            >
                                <Send className="w-4 h-4" />
                            </button>
                        </form>

                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
}
