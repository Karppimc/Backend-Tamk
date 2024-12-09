const { WebSocket } = require('ws');
const connectedClients = new Set();

const initializeWebsocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        connectedClients.add(ws);

        ws.send('Welcome to the WebSocket server!');

        ws.on('message', (message) => {
            const messageString = message.toString(); // Convert buffer to string
            console.log('Received:', messageString);

            try {
                // Attempt to parse the message as JSON
                const parsedMessage = JSON.parse(messageString);
                console.log('Parsed JSON message:', parsedMessage);

                // Broadcast the parsed JSON message
                connectedClients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(JSON.stringify(parsedMessage));
                    }
                });
            } catch (err) {
                // If parsing fails, treat it as plain text
                console.error('Invalid message format:', err.message);
                console.log('Broadcasting plain text message:', messageString);

                // Broadcast the plain text message
                connectedClients.forEach((client) => {
                    if (client.readyState === WebSocket.OPEN) {
                        client.send(messageString);
                    }
                });
            }
        });

        ws.on('close', () => {
            console.log('Client disconnected');
            connectedClients.delete(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });

    console.log('WebSocket server initialized');
};

module.exports = { initializeWebsocket };
