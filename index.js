const express = require('express');
const http = require('http')
const route = require('./routes/mainRoutes')
const { setupWebSocket } = require('./handler/wsHandler')
const app = express();
const server = http.createServer(app)
app.use(express.json())
app.use(express.urlencoded({ extended: true }));
app.use(route)
setupWebSocket(server)

