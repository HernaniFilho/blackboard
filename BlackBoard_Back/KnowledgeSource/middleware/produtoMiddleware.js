var produtos = [];
var alterado = false;
/* 
var altareda = [{nomeLoja: "LojaA", alterado: false}]

lojaExiste = alterada.find(nomeLoja => nomeLoja = req.body.nomeLoja);

if(lojaExiste.alterado == false) {
    // só pega a cache
}

if(lojaExiste) {
    index = alterada.indexOf(lojaExiste);
    alterada[index] = {nomeLoja: lojaExiste, alterado: true}; // so que false em updadeCacheprodutos
} else {
    alterada.push({nomeLoja: req.body.nomeLoja, alterado: true});
} */



const addProduto = (req, res, next) => {
    console.log("Passei por addProduto");
    /* const loja = req.body.nomeLoja;
    const nomeProduto = req.body.nome;

    const produtosEmLoja = produtos.find(produto => produto.nomeLoja === loja);
    if(produtosEmLoja === undefined) { // Talvez atualizar produtos aqui dnv 
        next();
    }

    const produtoExisteEmLoja = produtosEmLoja.find(produto => produto.nome === nomeProduto);
    if(produtoExisteEmLoja) { // Talvez atualizar produtos aqui dnv
        res.status(301).json({ message: "Produto com este nome já existe"});
    } else {
        next();
    } */
   alterado = true;
   next();
};

const listProduto = (req, res, next) => {
    console.log("Passei por listProduto");
    const loja = req.body.nomeLoja;

    if(alterado || produtos.length == 0) {
        console.log("Fez requisição no banco de dados");
        return next();
    } else {
        const produtosEmLoja = produtos.filter(produto => produto.nomeLoja === loja); 
        console.log("Não fez requisição no banco de dados");
        res.status(200).json(produtosEmLoja);
        console.log(produtosEmLoja);
    }
};

const updateCacheprodutos = (req, res) => {
    console.log("Passei pelo updateCacheProdutos");
    produtos = req.produtos;
    alterado = false;

    const loja = req.body.nomeLoja;
    const produtosEmLoja = produtos.filter(produto => produto.nomeLoja === loja); 
    res.status(201).json(produtosEmLoja);
};

const updateProduto = (req, res, next) => {
    console.log("Passei por updateProduto");
    /* const loja = req.body.nomeLoja;
    const nomeProduto = req.body.nome;

    const produtosEmLoja = produtos.find(produto => produto.nomeLoja === loja); 
    if(produtosEmLoja === undefined ) {
        next();
    } 

    const produtoExisteEmLoja = produtosEmLoja.find(produto => produto.nome === nomeProduto);
    if(produtoExisteEmLoja) {
        res.status(301).json({ message: "Produto com este nome já existe"});
    } else {
        next();
    } */
    alterado = true;
    var produto = req.body;
    index = produtos.indexOf(produto);
    produtos[index] = produtos;
    next();
};

const deleteProduto = (req, res, next) => {
    console.log("Passei por deleteProduto");
    /* const loja = req.body.nomeLoja;

    const produtosEmLoja = produtos.find(produto => produto.nomeLoja === loja); 
    if(produtosEmLoja === undefined) { // Talvez atualizar produtos aqui dnv
        next();
    } */
    alterado = true;
    var produto = req.body;
    index = produtos.indexOf(produto);
    produtos.splice(index, 1);
    next();
};

module.exports = {addProduto, listProduto, updateProduto, deleteProduto, updateCacheprodutos, produtos};