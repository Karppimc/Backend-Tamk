const {WebSocket} = require('ws');
const connectedClients = new Set();

const initializeWebsocket = (server) => {
    const wss = new WebSocket.Server({ server });

    wss.on('connection', (ws) => {
        console.log('Client connected');
        connectedClients.add(ws);
        ws.send('Welcome to the WebSocket server!');
        ws.on('message', (message) => {
            console.log('Received:', message);
            connectedClients.forEach((client) => {
                if (client !== ws && client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });
        ws.on('close', () => {
            console.log('Client disconnected');
            connectedClients.delete(ws);
        });

        ws.on('error', (error) => {
            console.error('WebSocket error:', error);
        });
    });


};

module.exports = {initializeWebsocket};