var produtos = [];
var alterado = false;


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

    const produtosEmLoja = produtos.find(produto => produto.nomeLoja === loja); 
    if(produtosEmLoja === undefined || alterado) { // Talvez atualizar produtos aqui dnv
        next();
        let teste = res.produtos;
        console.log(teste);
    } else {
        res.status(200).json(produtosEmLoja);
    }
};

const updateProduto = (req, res, next) => {
    console.log("Passei por updateProduto");
    const loja = req.body.nomeLoja;
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
    }
};

const deleteProduto = (req, res, next) => {
    console.log("Passei por deleteProduto");
    const loja = req.body.nomeLoja;

    const produtosEmLoja = produtos.find(produto => produto.nomeLoja === loja); 
    if(produtosEmLoja === undefined) { // Talvez atualizar produtos aqui dnv
        next();
    }
};

module.exports = {addProduto, listProduto, updateProduto, deleteProduto, produtos};