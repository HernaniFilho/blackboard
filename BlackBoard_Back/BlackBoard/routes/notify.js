const express = require('express');
const router = express.Router();

//Clientes conectados por SSE
const clients = new Set();

router.get('/', (req, res) => {
    // Set headers for SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');
  
    // Send a heartbeat message to keep the connection alive
    const heartbeat = setInterval(() => {
      res.write(': heartbeat\n\n');
    }, 30000);
  
    // Add client to the set
    clients.add(res);
    console.log(`Client connected. Total clients: ${clients.size}`);
  
    // Remove client when the connection is closed
    req.on('close', () => {
      clients.delete(res);
      console.log(`Client disconnected. Total clients: ${clients.size}`);
      clearInterval(heartbeat);
    });
  });

  module.exports = {router, clients};