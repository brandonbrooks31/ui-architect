import React, { useState, useRef, useEffect } from 'react';
import styles from './OpenClawWidget.module.css';

interface Message {
    role: 'user' | 'assistant';
    content: string;
}

export const OpenClawWidget: React.FC = () => {
    const [messages, setMessages] = useState<Message[]>([
        { role: 'assistant', content: 'Hello! I am Clawd. How can I help you today?' }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim() || isLoading) return;

        const userMessage = input.trim();
        setInput('');
        setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
        setIsLoading(true);

        try {
            const response = await fetch('/api/openclaw/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    messages: [{ role: 'user', content: userMessage }]
                }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();
            const assistantMessage = data.choices?.[0]?.message?.content || 'No response from OpenClaw Gateway.';
            
            setMessages(prev => [...prev, { role: 'assistant', content: assistantMessage }]);
        } catch (error) {
            console.error("OpenClaw Proxy Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', content: 'Error communicating with OpenClaw backend proxy.' }]);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.messagesContainer}>
                {messages.map((msg, index) => (
                    <div key={index} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.assistant}`}>
                        <div className={styles.messageContent}>
                            {msg.content}
                        </div>
                    </div>
                ))}
                {isLoading && (
                    <div className={`${styles.message} ${styles.assistant}`}>
                        <div className={styles.messageContent}>
                            <span className={styles.typingIndicator}>...</span>
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>
            
            <form onSubmit={handleSubmit} className={styles.inputForm}>
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Message Clawd..."
                    className={styles.inputField}
                    disabled={isLoading}
                />
                <button type="submit" disabled={isLoading || !input.trim()} className={styles.sendButton}>
                    Send
                </button>
            </form>
        </div>
    );
};
