import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-agendamento-confirmacao',
  templateUrl: './cadastro-agendamento-confirmacao.component.html',
  styleUrls: ['./cadastro-agendamento-confirmacao.component.css']
})
export class CadastroAgendamentoConfirmacaoComponent implements OnInit {


  objConfirmacao: any = null;

  constructor(
    private router: Router,

  ) {
    const nav = this.router.getCurrentNavigation();

    if (nav != null) {
      this.objConfirmacao = nav.extras.state.obj;
    } else {
      this.objConfirmacao = null;
    }

  }

  ngOnInit() {
    if (this.objConfirmacao == null) {
      this.router.navigate(["/"]);
      location.reload(true);

    }
  }

  print(x) {
    window.print();
  }

}

