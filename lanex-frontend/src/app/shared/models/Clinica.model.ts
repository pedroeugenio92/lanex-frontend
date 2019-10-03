export class Clinica {
    id: string;
    nome: string;
    cnpj: string;
    status: boolean;
    cep: string;
    logradouro: string;
    num_logradouro: string;
    complemento: string;
    id_cidade: string;
    id_estado: string;
    uf: string;
    telefone1: string;
    telefone2: string;
    email: string;
    id_cliente: string;
    icone: string;

    constructor(_id?: string, _nome?: string, _id_cliente?: string){
        this.id = _id;
        this.nome = _nome;
        this.id_cliente = _id_cliente;

    }
}
