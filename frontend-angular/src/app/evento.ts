export class Evento {
    nome: string;
    poster: string;
    classificacao: string;
    data: string;
    constructor(nome: string = "", data: string ="", poster: string ="", classificacao: string ="",){
        this.nome = nome;
        this.poster = poster;
        this.classificacao= classificacao;
        this.data= data;
    }
}