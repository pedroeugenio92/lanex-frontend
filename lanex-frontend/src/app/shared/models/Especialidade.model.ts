export class Especialidade {

    id: string;
    descricao: string;
    convenio: any[];  

    constructor(_id?: string, _descricao?: string){
        this.id = _id;
        this.descricao = _descricao;

    }
}
