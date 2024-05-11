const Produto = require("../model/produto")
const fs = require('fs');

let dados = [];

class ProdutoController{
    
    constructor(){

    }

    obterTodos = () => {
        this.recuperar();
        return dados
    };

    obter = (nome) => {
        let produto = dados.filter((x)=>x.nome==nome)[0];
        return produto;
    }

    incluir = (evento) => {
        dados.push(evento);
        this.persistir();
    }

    excluir = (nome) => {
        let posicao = dados.findIndex((x)=>x.nome==nome);  
        dados.splice(posicao,1);
        this.persistir();
    }

    alterar = (nome, evento) => {

        let posicao = dados.findIndex((x)=>x.nome==nome);  
        dados[posicao] = evento;
        this.persistir();

    }


    nomeArq = "produto-dados.json";
    persistir = () => {
        fs.writeFile(this.nomeArq,
            JSON.stringify(dados),
            (err)=>{
                if (err) throw err;
                console.log("Arquivo Salvo");
            })
    }
    recuperar = () => {
        fs.readFile(this.nomeArq,
            (err, dadosArq)=>{
                if (err) throw err;
                dados = JSON.parse(dadosArq);
                console.log("Arquivo Lido");
            })
    }
}

module.exports=ProdutoController;