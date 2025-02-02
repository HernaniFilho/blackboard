const express = require('express');
const router = express.Router();

//Clientes conectados por SSE
const clients = new Set();

router.get('/', (req, res) => {
    // Configura os cabeçalhos CORS para permitir acesso de outras origens
    res.setHeader('Access-Control-Allow-Origin', '*'); // Ou defina a origem específica
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Expose-Headers', 'Content-Type, Cache-Control, Connection');

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