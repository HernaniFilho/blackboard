/**

@file index.js

@description Arquivo principal do backend responsável por configurar o servidor Express, conectar ao MongoDB e definir as rotas da API.



@requires express

@requires mongoose

@requires cors

@requires dotenv

@requires ./routes/compra

@requires ./routes/fornecedor

@requires ./routes/produto

@requires ./routes/transferencia

@requires ./routes/venda

@requires ./routes/notify
*/
const express = require("express");   // Importa o Express para criar o servidor
const mongoose = require("mongoose"); // Importa o Mongoose para conexão com o MongoDB
const cors = require("cors");         // Importa o CORS para permitir requisições de diferentes origens
const dotenv = require("dotenv");     // Importa o dotenv para gerenciar variáveis de ambiente

// Importação das rotas da aplicação
const compras = require('./routes/compra');
const fornecedores = require('./routes/fornecedor');
const produtos = require('./routes/produto');
const tranferencias = require('./routes/transferencia');
const vendas = require('./routes/venda');
const notify = require('./routes/notify');


dotenv.config(); // Configuração do dotenv para carregar variáveis de ambiente

const app = express(); // Inicializa a aplicação Express
/**

Middleware para habilitar o CORS, permitindo o acesso de diferentes origens.
*/
app.use(cors());
/**

Middleware para habilitar o parsing de JSON nas requisições.
*/
app.use(express.json());

/**

Conexão com o banco de dados MongoDB.

Obtém a URL do banco a partir da variável de ambiente MONGO_URL.
*/
mongoose
  .connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB conectado"))
  .catch((err) => console.error("Erro ao conectar ao MongoDB:", err));

/**

Rota de teste para verificar se o servidor está funcionando.

@route GET /

@returns {string} Mensagem "Hello, World!"
*/
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

/**

Inicializa o servidor na porta definida na variável de ambiente PORT ou na porta 3000 por padrão.
*/
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));

/**

Definição das rotas da API.

Cada rota é responsável por um módulo específico da aplicação.
*/
app.use("/api/notify",notify.router);
app.use("/api/compras", compras);
app.use("/api/fornecedores", fornecedores);
app.use("/api/produtos", produtos);
app.use("/api/transferencias", tranferencias);
app.use("/api/vendas", vendas);
