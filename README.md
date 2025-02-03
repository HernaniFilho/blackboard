## Como usar este projeto?

Primeiro você deve fazer um npm install na raiz do projeto, ou seja, a pasta que possui as subpastas /BlackBoard_Back, 
/Gerenciador, /Loja_Varejo_1, /Loja_Varejo_2
Após isto, faça npm run istall-all. Desta forma será feito um npm install para cada subpasta.
E por fim, execute npm run start para iniciar o projeto. 

## Detalhes sobre o projeto

Em /BlackBoard_Back/.env possui um campo MONGO_URL, este deve ser preenchido com o seu link de um banco MongoDB, para a apresentação
deste trabalho foi utilizado um banco pessoal. Contudo, posteriormente deve ser usado o seu proprio banco.

## Como funciona o projeto?

Uma vez iniciado o proejto conforme a primeira sessão deste README, três portas serão abertas:
localhost:5173 - Gerenciador de Estoque
localhost:5174 - Loja A
localhost:5175 - Loja B

Em cada loja é possível fazer uma venda dos produtos da mesma, mas antes é preciso preencher o banco de dados usando o gerenciador.
Uma vez feito isso será possível usar as lojas A e B normalmente daqui em diante.