export class Convenio {

    id: string;
    nome: string;
    razao_social: string;
    status: boolean;
    icone: string;

    constructor(_id?: string, _nome?: string, _razao_social?: string){
        this.id = _id;
        this.nome = _nome;
        this.razao_social = _razao_social;

    }
}
