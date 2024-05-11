var express = require('express');
var ProdutoController = require('../controller/produto-controller')

var router = express.Router();
var controlador = new ProdutoController();

router.post('/carga',(req,res)=>{
    controlador.recuperar();
    res.end();
})

router.post('/armazenagem',(req,res)=>{
    controlador.persistir();
    res.end();
})

module.exports=router;