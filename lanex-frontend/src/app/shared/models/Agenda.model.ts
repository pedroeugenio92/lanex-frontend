export class Agenda {
    id: string;
    descricao: string;
    data_inicio: string;
    data_fim: string;
    status: string;

    constructor(_id?: string, _descricao?: string, _data_inicio?: string, _data_fim?: string, _status?: string){
        this.id = _id;
        this.descricao = _descricao;
        this.data_inicio = _data_inicio;
        this.data_fim = _data_fim;
        this.status = _status;

    }
}
