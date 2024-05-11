var express = require('express');
var ProdutoController = require('../controller/produto-controller')

var router = express.Router();
var controlador = new ProdutoController();

// middleware - Funciona como filtro na rota
router.use( (req, res, next) => {
  console.log('Time: ', `${req.method} : ${new Date()}`);
  next();
});

// Inicio do Web Service REST

// Consulta
router.get('/', async(req, res) => {
    res.json(controlador.obterTodos());
    res.end();
})

router.get('/:nome', async(req,res)=>{
    res.json(controlador.obter(req.params.nome));
    res.end(); 
})

// Inclusão
router.post('/', async(req, res) => {
    controlador.incluir(req.body);
    res.end();
})

// Remoção
router.delete('/:id', async(req,res)=>{
    controlador.excluir(req.params.id);  
    res.end(); 
})

// Alteração
router.put('/:id', async(req,res)=>{
    controlador.alterar(req.params.id,req.body);  
    res.end(); 
})

// Final do Web Service REST

module.exports = router;

