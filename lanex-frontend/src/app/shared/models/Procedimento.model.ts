export class Procedimento {
    id: string;
    descricao: string;
    valor: string;
    id_tipo_procedimento: string;
    retorno: string;
    dias_retorno: string;
    observacao: string;
    clinica: string;
    status: boolean;
    restricao_especialidade: any[];
    restricao_medico: any[];

    constructor(_id?: string, _descricao?: string, _valor?: string, _tipo_procedimento?: string,
        _retorno?: string, _dias_retorno?: string, _observacao?: string, _clinica?: string){
            
            this.id = _id;
            this.descricao = _descricao;
            this.valor = _valor;
            this.id_tipo_procedimento = _tipo_procedimento;
            this.retorno = _retorno;
            this.dias_retorno = _dias_retorno;
            this.observacao = _observacao;
            this.clinica = _clinica;
    }
}
