const Produto = require("./model/produto");
const express = require('express');
const cors = require('cors');

const rotaProdutos = require('./rotas/produto-rota')
const rotaAdmin = require('./rotas/admin-rota')

let dados = [
]

const app = express();
const port = 3000;
app.use(cors({
  origin: '*'
}));

app.get('/', (req, res) => {
    res.json({mensagem: "Alo mundo"});
    res.end();
})


app.use(express.json());
app.use('/produtos',rotaProdutos);
app.use('/admin',rotaAdmin);

app.listen(port, () => {
  console.log(`Servidor executando na porta ${port}`);
})


