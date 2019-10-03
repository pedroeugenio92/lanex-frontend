import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-cadastro-agendamento-parte3',
  templateUrl: './cadastro-agendamento-parte3.component.html',
  styleUrls: ['./cadastro-agendamento-parte3.component.css']
})
export class CadastroAgendamentoParte3Component implements OnInit {

  objAddAgendamento: any = {};
  ConfirmacaoAgendamento: FormGroup;
  objConfirmacao: any = {};
  buttonActive = 'c';
  isPago : any;
  listaFormaPagamento : ["Dinheiro", "açsdkaçl", "açsldka"]
  x = "Dinheiro"

  constructor(
    private router: Router,
    private formBuilder: FormBuilder,

  ) {
    const nav = this.router.getCurrentNavigation();

    if (nav != null) {
      this.objAddAgendamento = nav.extras.state.obj;
    } else {
      this.objAddAgendamento = null;
    }

  }

  ngOnInit() {
    if (this.objAddAgendamento == null) {
      this.router.navigate(["/"]);
      location.reload(true);

    }

    this.objConfirmacao.exame = "Alterar a tela de exames para passar o dado";
    this.objConfirmacao.paciente = "Tela sendo feita para passar dados do paciente";
    this.objConfirmacao.dataHora = this.formatarData(this.objAddAgendamento.data) + ' às ' + this.objAddAgendamento.horario;
    this.objConfirmacao.local = "Metrô Santana - Av Cruzeiro do Sul, 3099";
    this.objConfirmacao.planoSaude = "Particular";
    this.objConfirmacao.valor = "233,00";
    this.objConfirmacao.medico = this.objAddAgendamento.medico.name;
    this.objConfirmacao.atendente = "Nome atendente";
    this.objConfirmacao.listaObs = ["Vai ser passado na primeira tela de exames. ", "Vai ser passado na primeira tela de exames. "];
    this.objConfirmacao.formaPagamento ="Dinheiro";
    this.objConfirmacao.isPago = true;

  }

  setPagamento( boll){
    this.objConfirmacao.isPago = boll;
  }

  formatarData(date) {
    let nomeDiaSemana = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    let nomeMes = ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"];



    const diaSemana = nomeDiaSemana[date.getDay()]
    const data = date.getDate();
    const mesCompleto = nomeMes[date.getMonth()];

    return `${diaSemana}, ${data} de ${mesCompleto}`;

  }

  finalizar(){
    this.router.navigateByUrl('agendamento/cadastro/confirmacao', {
      state: { obj: this.objConfirmacao }
    })
  }
}
