
import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot, User, Sparkles, Mic, Volume2 } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from 'axios';
import { API_ENDPOINTS } from '@/lib/api';

interface Message {
    role: 'user' | 'ai';
    content: string;
}

const AICounselor = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'ai', content: 'Hello! I am your AI Admission Counselor. How can I help you with your MHT-CET or JEE journey today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const scrollAreaRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        if (scrollAreaRef.current) {
            const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
            if (scrollContainer) {
                scrollContainer.scrollTop = scrollContainer.scrollHeight;
            }
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const [isListening, setIsListening] = useState(false);

    const speak = (text: string) => {
        if ('speechSynthesis' in window) {
            const utterance = new SpeechSynthesisUtterance(text);
            window.speechSynthesis.speak(utterance);
        } else {
            console.error("Text-to-speech not supported.");
        }
    };

    const startListening = () => {
        if ('webkitSpeechRecognition' in window) {
            const recognition = new (window as any).webkitSpeechRecognition();
            recognition.continuous = false;
            recognition.interimResults = false;
            recognition.lang = 'en-US';

            recognition.onstart = () => setIsListening(true);
            recognition.onend = () => setIsListening(false);
            recognition.onresult = (event: any) => {
                const transcript = event.results[0][0].transcript;
                setInput(transcript);
            };

            recognition.start();
        } else {
            alert("Speech recognition not supported in this browser. Try Chrome.");
        }
    };

    const handleSend = async () => {
        if (!input.trim()) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await axios.post<{ response: string }>(API_ENDPOINTS.AI_CHAT, {
                message: userMessage
            });

            const aiResponse = response.data.response;
            setMessages(prev => [...prev, { role: 'ai', content: aiResponse }]);
        } catch (error) {
            console.error("Error talking to AI:", error);
            setMessages(prev => [...prev, { role: 'ai', content: "I'm sorry, I'm having trouble connecting to the server right now. Please try again later." }]);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-background">
            <Header />
            <div className="flex-grow container mx-auto px-4 py-8 flex flex-col items-center justify-center">
                <Card className="w-full max-w-3xl h-[80vh] flex flex-col shadow-xl border-t-4 border-t-primary">
                    <CardHeader className="border-b bg-muted/30">
                        <div className="flex items-center gap-2">
                            <Sparkles className="h-6 w-6 text-yellow-500 fill-yellow-500" />
                            <CardTitle className="text-2xl">AI Admission Counselor</CardTitle>
                        </div>
                        <CardDescription>Powered by Google Gemini</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-grow p-0 overflow-hidden flex flex-col">
                        <ScrollArea className="flex-grow p-4" ref={scrollAreaRef}>
                            <div className="space-y-4">
                                {messages.map((msg, index) => (
                                    <div
                                        key={index}
                                        className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''
                                            }`}
                                    >
                                        <div
                                            className={`h-10 w-10 rounded-full flex items-center justify-center flex-shrink-0 ${msg.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                                                }`}
                                        >
                                            {msg.role === 'user' ? <User size={20} /> : <Bot size={20} />}
                                        </div>
                                        <div
                                            className={`rounded-lg p-3 max-w-[80%] text-sm shadow-sm ${msg.role === 'user'
                                                ? 'bg-primary text-primary-foreground'
                                                : 'bg-secondary text-secondary-foreground'
                                                }`}
                                        >
                                            {msg.content}
                                            {msg.role === 'ai' && (
                                                <button onClick={() => speak(msg.content)} className="ml-2 text-muted-foreground hover:text-foreground">
                                                    <Volume2 size={14} />
                                                </button>
                                            )}
                                        </div>
                                    </div>
                                ))}
                                {isLoading && (
                                    <div className="flex items-start gap-3">
                                        <div className="h-10 w-10 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-muted-foreground">
                                            <Bot size={20} />
                                        </div>
                                        <div className="bg-secondary text-secondary-foreground rounded-lg p-3 max-w-[80%] text-sm animate-pulse">
                                            Thinking...
                                        </div>
                                    </div>
                                )}
                            </div>
                        </ScrollArea>
                        <div className="p-4 border-t bg-background">
                            <div className="flex gap-2">
                                <Input
                                    placeholder="Ask about colleges, cutoffs, or admission process..."
                                    value={input}
                                    onChange={(e) => setInput(e.target.value)}
                                    onKeyDown={handleKeyPress}
                                    disabled={isLoading}
                                    className="flex-grow"
                                />
                                <Button size="icon" variant={isListening ? "destructive" : "secondary"} onClick={startListening}>
                                    <Mic size={18} />
                                </Button>
                                <Button onClick={handleSend} disabled={isLoading || !input.trim()}>
                                    <Send size={18} />
                                    <span className="sr-only">Send</span>
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Footer />
        </div>
    );
};

export default AICounselor;
