import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim()) return;
    
        const newMessages = [...messages, { role: "user", content: input }];
        setMessages(newMessages);
        setInput("");
        setLoading(true);
        
        try {
            const response = await axios.post("http://localhost:3001/api/chatbot", {
                messages: newMessages, // ✅ Make sure backend expects this
            }, {
                headers: { "Content-Type": "application/json" },
            });
    
            const botReply = response.data.botReply; // ✅ Correctly parse backend response
            setMessages([...newMessages, botReply]);
            
        } catch (error) {
            console.error("Error fetching response:", error);
        }
    
        setLoading(false);
    };

    const handleKeyPress = (e) => {
        if (e.key === "Enter") {
            sendMessage();
        }
    };

    return (
        <div className="chat-container">
            <div className="chat-header">
                <h4>Workplus Chatbot</h4>
            </div>
            <div className="chat-messages"
                style={{
                    border: "1px solid #ccc",
                    padding: "10px",
                    height: "300px",
                    overflowY: "auto",
                    background: "#f9f9f9",
                }}
            >
                {messages.map((msg, index) => (
                    <div
                        className="chat-messages"
                        key={index}
                        style={{
                            textAlign: msg.role === "user" ? "right" : "left",
                            margin: "5px 0",
                        }}
                    >
                        <b>{msg.role === "user" ? "You" : "Bot"}:</b> {msg.content}
                    </div>
                ))}
                {loading && <div>Bot is typing...</div>}
            </div>
            <div className="chat-input">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress} // Add this line
                    placeholder="Type a message..."
                    style={{ width: "80%", padding: "8px" }}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default Chatbot;
