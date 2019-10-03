export class Medico {
    id: string;
    nome: string;
    data_nascimento: string;
    id_conselho: string;
    uf_conselho: string;
    registro: string;
    cpf: string;
    telefone: string;
    especialidade: any[];
    sexo: string;
    convenio: any[];  
    procedimento: any[];
    rg: string;
    orgao_emissor: string;
    uf_orgao_emissor: string;
    email: string;
    funcao: string;  

    constructor(_id?: string, _nome?: string, _data_nascimento?: string, _cpf?: string, _telefone?: string){
        this.id = _id;
        this.nome = _nome;
        this.data_nascimento = _data_nascimento;
        this.cpf = _cpf;
        this.telefone = _telefone;
    }
}
