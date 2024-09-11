import React, { useState, useEffect } from 'react';
import { Button, TextField, Box, List, ListItem } from '@mui/material';
import { connect, sendMessage } from '../../WebSocketHelper';

const ChatApp = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        connect((msg) => setMessages((prev) => [...prev, msg.content]));
    }, []);

    const handleSendMessage = () => {
        sendMessage(input, 'User1');
        console.log(input)
        setInput('');
    };

    return (
        <Box className="p-4">
            <List className="h-64 overflow-y-auto">
                {messages.map((msg, idx) => (
                    <ListItem key={idx}>{msg}</ListItem>
                ))}
            </List>
            <TextField
                value={input}
                onChange={(e) => setInput(e.target.value)}
                fullWidth
            />
            <Button onClick={handleSendMessage} variant="contained" color="primary">
                Send
            </Button>
        </Box>
    );
};

export default ChatApp;
