import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import Layout from '@/layouts/app-layout';
import { SharedData, User } from '@/types';
import { Head, usePage } from '@inertiajs/react';
import axios from 'axios';
import { Mic, Send } from 'lucide-react';
import { useCallback, useEffect, useRef, useState } from 'react';

type Message = {
    id: number;
    receiver: number;
    sender: number;
    message: string;
    created_at: string | Date;
    updated_at: string | Date;
};
export default function Index({ users }: { users: User[] }) {
    const [messages, setMessages] = useState<Message[]>();
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [inputValue, setInputValue] = useState('');
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const auth = usePage<SharedData>().props.auth;

    const scrollToBottom = useCallback(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, []);

    useEffect(() => {
        scrollToBottom();
    }, [messages, scrollToBottom]);

    const [isSending, setIsSending] = useState(false);

    const handleSendMessage = async (userId: number) => {
        if (!inputValue.trim()) return;

        setIsSending(true);

        try {
            const payload = {
                id: 1000000,
                sender: auth.user.id,
                receiver: userId,
                message: inputValue,
                created_at: new Date(),
                updated_at: new Date(),
            };

            setMessages((prev) => [...(prev || []), payload]);
            setInputValue('');

            await axios.post(`/messages`, payload);
        } catch (error) {
            console.error(error);
        } finally {
            setIsSending(false);
        }
    };

    useEffect(() => {
        const handleFetchMessage = async () => {
            if (!selectedUser) return;

            const res = await axios.get('/messages/' + selectedUser?.id);

            if (res.status === 200) {
                setMessages(res.data);
            }
        };

        handleFetchMessage();

        const timeInterval = 2000;
        const interval = setInterval(() => handleFetchMessage(), timeInterval);

        return () => clearInterval(interval);
    }, [selectedUser]);

    return (
        <Layout>
            <Head title="Chat" />
            <div className="flex h-[90vh] w-full overflow-hidden border rounded">
                {/* Sidebar - Users */}
                <div className="w-1/4 border-r p-4 space-y-4 ">
                    <h2 className="text-xl font-semibold">Users</h2>
                   
                        <Button
                            variant='default'
                            className="w-full justify-start"
                        >
                            AzizMasri
                        </Button>
                    
                </div>

                {/* Chat area */}
                <div className="flex flex-col w-3/4">
                    {selectedUser ? (
                        <>
                            {/* Header */}
                            <div className="border-b p-4 bg-background shadow-sm">
                                <h2 className="text-lg font-semibold">AzizMasri</h2>
                            </div>

                            {/* Messages area */}
                            <ScrollArea className="flex-1 overflow-y-auto p-4">
                                <div className="space-y-2">
                                    {messages?.map((message) => (
                                        <div
                                            key={message.id}
                                            className={`flex ${message.sender === auth.user.id ? 'justify-end' : 'justify-start'}`}
                                        >
                                            <div
                                                className={`max-w-[75%] px-4 py-2 rounded-2xl text-sm ${
                                                    message.sender === auth.user.id
                                                        ? 'bg-primary text-primary-foreground rounded-br-none'
                                                        : 'bg-muted rounded-bl-none'
                                                }`}
                                            >
                                                {message.message}
                                            </div>
                                        </div>
                                    ))}
                                    <div ref={messagesEndRef} />
                                </div>
                            </ScrollArea>

                            {/* Input area */}
                            <div className="border-t p-4">
                                <div className="flex items-center gap-2">
                                    <Input
                                        value={inputValue}
                                        onChange={(e) => setInputValue(e.target.value)}
                                        placeholder="Type a message..."
                                        className="rounded-full px-4 py-2"
                                        onKeyDown={(e) => {
                                            if (e.key === 'Enter' && inputValue.trim()) {
                                                handleSendMessage(selectedUser.id);
                                            }
                                        }}
                                    />
                                    <Button
                                        onClick={() => handleSendMessage(selectedUser.id)}
                                        disabled={isSending || inputValue.trim() === ''}
                                        size="icon"
                                        className="rounded-full"
                                    >
                                        <Send className="h-5 w-5" />
                                    </Button>
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex-1 flex items-center justify-center text-muted-foreground">
                            <p>Select a user to start chatting.</p>
                        </div>
                    )}
                </div>
            </div>
        </Layout>

    );
}