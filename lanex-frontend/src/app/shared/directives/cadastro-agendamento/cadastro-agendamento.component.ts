import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro-agendamento',
  templateUrl: './cadastro-agendamento.component.html',
  styleUrls: ['./cadastro-agendamento.component.css']
})
export class CadastroAgendamentoComponent implements OnInit {

  date: any = new Date();
  listaCidades = [{ name: 'Cidade 1', id: '1' }, { name: 'Cidade 2', id: '2' }];
  listaOrdenar = [{ name: 'Disponibilidade', id: '1' }];
  centroMedico: string = '1';
  selectOrdenar: string = '1';

  listaClinica = [
    { name: 'ImageMais', id: '1', vagas: '5', value: '233,00' },
    {name : 'Clínica B', id : '2', vagas:'5', value:'230,00'},
    {name : 'Clínica C', id : '2', vagas:'5', value:'233,00'},
  ];

  constructor(
    private router: Router,

  ) { }

  ngOnInit() {
  }


  proximaEtapa(obj){
    let objParameter = {clinica : obj, data : this.date};

    this.router.navigateByUrl('/agendamento/cadastro/parte2', {
      state: { obj: objParameter }
    })
  }

}
