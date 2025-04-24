"use client";
import { useEffect, useState } from "react";

export default function WebSocketTest(){
    const [messages, setMessages] = useState<string[]>([]);
    const [socket, setSocket] = useState<WebSocket | null>(null);

    useEffect(() => {
        const ws = new WebSocket("ws://localhost:5000");

        ws.onopen = () => {
            console.log("🔌 Connected to Node WebSocket");
            ws.send("Ping from Next.js (TS)");
        };

        ws.onmessage = (event: MessageEvent) => {
            console.log("📥 Message:", event.data);
            setMessages(prev => [...prev, event.data]);
        };

        ws.onclose = () => {
            console.log("❌ Disconnected");
        };

        setSocket(ws);

        return () => {
            ws.close();
        };
    }, []);

    return (
        <div style={{ padding: "2rem" }}>
            <h1>🔌 WebSocket Test (TSX)</h1>
            <ul>
                {messages.map((msg, index) => (
                    <li key={index}>{msg}</li>
                ))}
            </ul>
        </div>
    );
}
