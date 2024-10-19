const websocket = require('ws')
const { accountCount } = require('../service/accountCounter')

module.exports = {
    setupWebSocket : async (server) => {
        const wss = new websocket.Server({ server, path: '/ws' })
        async function broadcastAccountCount() {
            try {
                const count = await accountCount()
                wss.clients.forEach(client => {
                    if (client.readyState === websocket.OPEN) {
                        client.send(JSON.stringify(count))
                    }
                })
            } catch (error) {
                console.error('Error broadcasting account count:', error)
            }
        }
        wss.on('connection', (ws) => {
            console.log('Client connected')
            broadcastAccountCount()
            ws.on('close', () => {
                console.log('Client disconnected')
            })
        })
        setInterval(broadcastAccountCount, 5000)

        const port = parseInt(process.env.PORT) || 3000;
        server.listen(port, () => {
        console.log(`listening on port ${port}`);
        });
    }
}