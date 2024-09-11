import SockJS from 'sockjs-client';
import Stomp from 'stompjs';

const socket = new SockJS('http://localhost:9898/chat');
const stompClient = Stomp.over(socket);

export const connect = (onMessageReceived: (message: any) => void) => {
    try {
        stompClient.connect({}, () => {
            stompClient.subscribe('/topic/messages', (message) => {
                try {
                    onMessageReceived(JSON.parse(message.body));
                } catch (error) {
                    console.error('Error parsing message body:', error);
                }
            });
        }, (error) => {
            console.error('STOMP connection error:', error);
        });
    } catch (error) {
        console.error('Error establishing STOMP connection:', error);
    }
};

export const sendMessage = (message: string, sender: string) => {
    try {
        stompClient.send('/app/sendMessage', {}, JSON.stringify({ sender, content: message }));
    } catch (error) {
        console.error('Error sending message:', error);
    }
};
