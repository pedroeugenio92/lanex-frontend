export class Conselho {
    id: string;
    sigla: string;
    nome: string;
    id_estado: string;
    
    constructor(_id?: string,_sigla?: string, _nome?: string, _id_estado?: string){
        this.id = _id;
        this.sigla = _sigla;
        this.nome = _nome;
        this.id_estado = _id_estado;

    }
}
